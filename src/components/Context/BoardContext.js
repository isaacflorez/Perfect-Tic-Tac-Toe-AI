import React, { useState, useEffect } from 'react'
const BoardContext = React.createContext()                                  // context imported in components

export function ListProvider({ children }){
    const [message, setMessage] = useState('may luck be in your favor')     // end game message
    const [currentPlayer, setCurrentPlayer] = useState('')                  // current player
    const [startingPlayer, setStartingPlayer] = useState(false)             // starting player
    const [activeGame, setActiveGame] = useState(false)                     // active game
    const [boardData, setBoardData] = useState(                             // game board
        [ ['', '', ''], ['', '', ''], ['', '', ''] ])                       // initialized as empty at launch
    const WINNING_COMBOS = [        // possible winning moves
        [ [0,0], [0,1], [0,2] ],    // top row
        [ [1,0], [1,1], [1,2] ],    // middle row
        [ [2,0], [2,1], [2,2] ],    // bottom row
        [ [0,0], [1,0], [2,0] ],    // left col
        [ [0,1], [1,1], [2,1] ],    // middle col
        [ [0,2], [1,2], [2,2] ],    // right col
        [ [0,0], [1,1], [2,2] ],    // tl diagnol to br
        [ [0,2], [1,1], [2,0] ]     // tr diagnol to bl
    ]
    
    useEffect(() => {
        if (isWinner(boardData, 'X') || isWinner(boardData, 'O')){
            setMessage(`${currentPlayer} wins`)
            setActiveGame(false)
            setStartingPlayer(false)
        }
        else if(isTie(boardData)){
            setMessage(`tied`)
            setActiveGame(false)
            setStartingPlayer(false)
        }
        else if(currentPlayer === 'O'){
            setTimeout(() => {
                let bestMove = minimax(boardData, 'X', 0)                       // get minimax move
                addMoveToBoard(bestMove.move[0], bestMove.move[1], 'O')         // add move
                if(!isWinner(boardData, 'O')){                                  // change player if no win
                    changePlayer()
                }
            }, 250)
        }
    }, [boardData])

    let updateStartingPlayer = (player) => {
        if (!activeGame && isBoardEmpty(boardData)){
            if (startingPlayer)
                alert('a starting player has already been chosen to start')
            else {
                setStartingPlayer(true)
                setCurrentPlayer(player)
                setActiveGame(true)
                if(player === "O"){
                    setTimeout(() => {
                        let bestMove = minimax(boardData, 'X')    
                        addMoveToBoard(bestMove.move[0], bestMove.move[1], 'O')  
                        changePlayer()
                    }, 250)
                }
            }
        }
        else {
            alert('Finish game and reset board to pick a new starter')
        }
    }

    let changePlayer = () => { 
        currentPlayer === 'X'
        ? setCurrentPlayer('O')
        : setCurrentPlayer('X')
    }

    let checkMove = (x,y) => {
        if(activeGame){
            if(boardData[x][y] === ''){
                addMoveToBoard(x,y, currentPlayer)
                if(!isWinner(boardData, 'X') && !isWinner(boardData, 'O')){
                    changePlayer()
                }
            }
        }
        else if(!activeGame && !isBoardEmpty(boardData)){           // games over with moves on board
            alert('Clean board and select who starts')
        }
        else alert('Select a starting player')                      // not active game and empty board
    }

    let addMoveToBoard = (x,y, value) => {
        let temp = [...boardData]
        temp[x][y] =  value
        setBoardData(temp)          // useEffect is runs after this
    }
   
    let isWinner = (board = boardData, player) => {
        let n = WINNING_COMBOS.length               
        for(let i = 0; i < n; i++){
            let combo = WINNING_COMBOS[i]
            let a = board[combo[0][0]][combo[0][1]]
            let b = board[combo[1][0]][combo[1][1]]
            let c = board[combo[2][0]][combo[2][1]]
            if(a !== '' && a === b && b === c && a === player) {
                return true
            }
        }
        return false
    }

    let isTie = (board) => {
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if(board[i][j] === '') return false
            }
        }
        return true
    }

    let cleanBoard = () => {
        setBoardData( [ ['', '', ''], ['', '', ''], ['', '', ''] ] )
        setActiveGame(false)
        setStartingPlayer(false)
        setCurrentPlayer('')
        setMessage('may luck be in your favor')
    }

    let isBoardEmpty = () => {
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if(boardData[i][j] !== '') return false
            }
        }
        return true
    }

    let getAvailableMoves = (board) => {
        let availableMoves = []
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if(board[i][j] === ''){
                    availableMoves.push([i,j])
                }
            }
        }
        return availableMoves
    }

    let getBoardWithMove = (board, move, value) => {
        let [x,y] = [move[0], move[1]]
        const temp = copyBoard(board)
        temp[x][y] = value
        return temp
    }

    let copyBoard = (board) => {
        const copy = [ ['', '', ''], ['', '', ''], ['', '', ''] ]
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                copy[i][j] = board[i][j]
            }
        }
        return copy
    }

    let minimax = (board, player, depth) => {                  // MiniMax Algorithim for AI
        if (player === 'X') player = 'O'                // Update player every recursion
        else { player = 'X' }

        // Base Cases for simulated score boards
        if(isWinner(board, 'X')) return { move: null, score: 10 - depth}
        else if (isWinner(board, 'O')) return { move: null, score: depth - 10 } 
        else if (getAvailableMoves(board).length === 0) return { move: null, score: 0 }

        // Set return value based on Min or Max player
        let bestMove = {move: null, score: 0}
        if (player === 'X'){
            bestMove.score = -Infinity
        } else {
            bestMove.score = Infinity
        }

        getAvailableMoves(board).forEach((move) => {                // get scores for available moves
            let simBoard = getBoardWithMove(board, move, player)    // simulate a board with move made
            let simScore = minimax(simBoard, player, depth + 1)     // get score for this simulated board
            if (player === 'X'){                                    // X wants maximum score
                if (simScore.score > bestMove.score){
                    bestMove.move = move
                    bestMove.score = simScore.score
                }
            } else if (player === 'O') {                            // O wants minimum score
                if (simScore.score < bestMove.score){
                    bestMove.move = move
                    bestMove.score = simScore.score
                }
            }
        })
        return bestMove
    }
    
    const context = {
        actions: {checkMove, cleanBoard, updateStartingPlayer},     // helper functions
        state: {boardData, setBoardData, message}                   // state getters and setters
    }

    return (
        <BoardContext.Provider value={{context}}>
            {children}
        </BoardContext.Provider>
    )
}
export default BoardContext