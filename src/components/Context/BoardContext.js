import React, { useState, useEffect } from 'react'

const BoardContext = React.createContext()          // context to be imported in components
export function ListProvider({ children }){
    const [message, setMessage] = useState('may luck be in your favor')     // end game message
    const [currentPlayer, setCurrentPlayer] = useState('')                  // current player
    const [gameOver, setGameOver] = useState(false)                         // active game
    const [boardData, setBoardData] = useState(                             // game board
        [ ['', '', ''], ['', '', ''], ['', '', ''] ])       // initialized as empty at launch
    const WINNING_COMBOS = [        // all possible winning moves as coordinates
        [ [0,0], [0,1], [0,2] ],    // top row
        [ [1,0], [1,1], [1,2] ],    // middle row
        [ [2,0], [2,1], [2,2] ],    // bottom row
        [ [0,0], [1,0], [2,0] ],    // left col
        [ [0,1], [1,1], [2,1] ],    // middle col
        [ [0,2], [1,2], [2,2] ],    // right col
        [ [0,0], [1,1], [2,2] ],    // tl diagnol to br
        [ [0,2], [1,1], [2,0] ]     // tr diagnol to bl
    ]
    
    useEffect(() => {                               // this runs whenever boardData is changed
        if(isBoardEmpty()){                         // start game as X when board is clear
            setCurrentPlayer('X')
        }
        else if(isWinner(boardData, 'X') || isWinner(boardData, 'O')){        // check for winner
            setMessage(`${currentPlayer} wins`)     // set winning message
            setGameOver(true)                       // game over is true
            setCurrentPlayer('X')                   // player reset to X for new game
        }
        else if(isTie()){
            setMessage(`tied`)          // set winning message
            setGameOver(true)           // game over is true
            setCurrentPlayer('X')       // player reset to X for new game
        }
        else if(currentPlayer === 'O'){                 // @ on AI turn
            setTimeout(() => {                          // wait .25 seconds before playing
                makeRandomMove()                        // make a random move
                if(!isWinner(boardData, 'O')){          // check for win
                    changePlayer()                      // if no win change players
                }      
            }, 250);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [boardData])

    let changePlayer = () => {      
        currentPlayer === 'X'           // if curr player is X
        ? setCurrentPlayer('O')         // change to O
        : setCurrentPlayer('X')         // other wise change to O
    }

    let checkMove = (x,y) => {                          // see if move is valid or not
        if (!gameOver){                                 // if game is still going
            if(boardData[x][y] === ''){                 // check if spot on the board is empty
                addMoveToBoard(x,y, currentPlayer)      // update board with new move
                if(!isWinner(boardData, 'X') && !isWinner(boardData, 'O')){
                    changePlayer()
                }
            }
        }
        else alert('reset board to play again')     // cannot make a move if game is over
    }

    let addMoveToBoard = (x,y, value) => {      // update board at coordinated with value
        let temp = [...boardData]               // copy current board
        temp[x][y] =  value                     // mark square in temp board
        setBoardData(temp)                      // set boardData to temp board
    }
   
    let isWinner = (board = boardData, player) => {                      // FIND A BETTER WAY TO DO THIS (:
        let n = WINNING_COMBOS.length               
        for(let i = 0; i < n; i++){                             // loop over winning combos
            let combo = WINNING_COMBOS[i]
            let a = board[combo[0][0]][combo[0][1]]         // get 3 squares from combo
            let b = board[combo[1][0]][combo[1][1]]
            let c = board[combo[2][0]][combo[2][1]]
            if(a !== '' && a === b && b === c && a === player) return true      // combo found
        }
        return false        // no winning combos are found
    }

    let isTie = () => {
        for (let i = 0; i < 3; i++){            // loop through board data
            for (let j = 0; j < 3; j++){
                if(boardData[i][j] === '') return false  // empty square found
            }
        }
        return true         // no empties are found therefore game is tied
    }

    let cleanBoard = () => {        // reset all state to beginning of game
        setBoardData( [ ['', '', ''], ['', '', ''], ['', '', ''] ] )
        setGameOver(false)
        setMessage('may luck be in your favor')
    }

    // PUT AI CODE HERE 
    let makeRandomMove = () => {
        let openMoves = getAvailableMoves(boardData)
        let move = openMoves[getRandomInt(openMoves.length)]        // pick random index
        addMoveToBoard(move[0],move[1], currentPlayer)              // move to random open square
    }

    let getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    let isBoardEmpty = () => {                                      // check if board is clean
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if(boardData[i][j] !== '') return false
            }
        }
        return true
    }

    let getScore = (board) => {                     // score the outcome for minimax algorithm
        if (isWinner(board, 'O')){
            return 10
        } else if (isWinner(board, 'X')) {
            return -10
        }
        else return 0

    }

    let getAvailableMoves = (board) => {            // takes in a board object
        let availableMoves = []                     // get a list of open moves
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if(board[i][j] === ''){             // check if move is empty
                    availableMoves.push([i,j])      // add the empty coordinates to list
                }
            }
        }
        return availableMoves
    }

    let getBoardWithMove = (board, move, value) => {
        let [x,y] = [move[0], move[1]]
        let temp = [...board]
        temp[x][y] = value
        return temp
    }

    const context = {
        actions: {checkMove, cleanBoard},               // helper functions
        state: {boardData, setBoardData, message}       // state getters and setters
    }

    return (
        <BoardContext.Provider value={{context}}>
            {children}
        </BoardContext.Provider>
    )
}
export default BoardContext