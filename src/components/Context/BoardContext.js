import React, { useState, useEffect } from 'react'

const BoardContext = React.createContext()          // context to be imported in components
export function ListProvider({ children }){
    const [message, setMessage] = useState('may luck be in your favor')     // end game message
    const [currentPlayer, setCurrentPlayer] = useState('')                  // current player
    const [gameOver, setGameOver] = useState(false)                         // active game
    const [aiChoice, setAiChoice] = useState([0,0])
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
        console.log('INSIDE USE EFFECT')
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


        // else if(currentPlayer === 'O'){                 // @ on AI turn
        //     setTimeout(() => {                          // wait .25 seconds before playing
        //         makeRandomMove()                        // make a random move
        //         if(!isWinner(boardData, 'O')){          // check for win
        //             changePlayer()                      // if no win change players
        //         }      
        //     }, 250);
        // }


        // AI needs to make a move THEN change player
        // - call minimax on board
        //      - this function should also update the aiChoice
        // - add the ai move to the board
        // - change playerif game is not over
        else if(currentPlayer === 'O'){
            console.log('ai making move')
            let score = minimax(boardData, 'X')
            console.log(score)
            console.log("ai choice ->", aiChoice)
            addMoveToBoard(aiChoice[0], aiChoice[1], 'O')
            // let possibleMoves = getAvailableMoves(boardData)
            // console.log(possibleMoves)
            // updateAiChoice(possibleMoves[0])        // for now the AI takes the first available move
            if(!isWinner(boardData, 'O')){
                changePlayer()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [boardData])

    // ISSUE HERE -> ran this and my laptop went bonkers lmaooooo
    // directly setting the state value caused an infinite loop somehow
    // the original error was cannot set the value at [0]

    // IT COULD BE PASSING IN A MOVE THAT DOESNT EXIST!!! as in when there are no moves left
    // there is an empu array from possible moves funciton!! thus maybe thats why we get
    // cannot access newMove[0] bc it is undefined because there are no more moves and it is
    // an empty array

    let updateAiChoice = (move) => {
        const newMove = [0,0]
        newMove[0] = move[0]
        newMove[1] = move[1]

        setAiChoice(newMove)
        // setAiChoice(move)
    }

    let changePlayer = () => { 
        currentPlayer === 'X'
        ? setCurrentPlayer('O')
        : setCurrentPlayer('X')
        
    }

    // the OnClick for every square if move is open it is played
    // Only called when human makes play
    let checkMove = (x,y) => {
        if (!gameOver){
            if(boardData[x][y] === ''){
                addMoveToBoard(x,y, currentPlayer)
                if(!isWinner(boardData, 'X') && !isWinner(boardData, 'O')){
                    changePlayer()
                }
            }
        }
        else alert('reset board to play again')
    }

    // called only if valid move is clicked by user
    let addMoveToBoard = (x,y, value) => {
        console.log(currentPlayer, 'adding move -> ', x,y)
        let temp = [...boardData]
        temp[x][y] =  value
        setBoardData(temp)
    }
   
    // compare board with winning combos
    let isWinner = (board = boardData, player) => {
        let n = WINNING_COMBOS.length               
        for(let i = 0; i < n; i++){
            let combo = WINNING_COMBOS[i]
            let a = board[combo[0][0]][combo[0][1]]
            let b = board[combo[1][0]][combo[1][1]]
            let c = board[combo[2][0]][combo[2][1]]
            if(a !== '' && a === b && b === c && a === player) return true
        }
        return false        // no winning combos are found
    }

    // ties only happen if no moves left
    let isTie = () => {
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if(boardData[i][j] === '') return false
            }
        }
        return true
    }

    // reset state of the game
    let cleanBoard = () => {
        setBoardData( [ ['', '', ''], ['', '', ''], ['', '', ''] ] )
        setGameOver(false)
        setMessage('may luck be in your favor')
    }

    // random move AI player
    let makeRandomMove = () => {
        let openMoves = getAvailableMoves(boardData)
        let move = openMoves[getRandomInt(openMoves.length)]        // pick random index
        addMoveToBoard(move[0],move[1], currentPlayer)              // move to random open square
    }

    // helper function for random AI player
    let getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    let isBoardEmpty = () => {
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if(boardData[i][j] !== '') return false
            }
        }
        return true
    }

    // determine a score for the board
    let getScore = (board) => {
        if (isWinner(board, 'O')){
            return 10
        } else if (isWinner(board, 'X')) {
            return -10
        }
        else return 0
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

    // ISSUES *********** the board being passed is updating when called again
    // temp values are not really temporary
    // for some reason when the board is being passed in, a temp board is returned but
    // everytime this is called with the next temp board the original board is being 
    // changed as well. I believe this is whats causing the entire board to fill up
    // FIXED ????? does not appear to be any more issues with copying array due to
    let getBoardWithMove = (board, move, value) => {
        let [x,y] = [move[0], move[1]]
        const temp = copyBoard(board)
        temp[x][y] = value
        return temp
    }

    // return a deep copy of a board that will not effect the original
    let copyBoard = (board) => {
        const copy = [ ['', '', ''], ['', '', ''], ['', '', ''] ]
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                copy[i][j] = board[i][j]
            }
        }
        return copy
    }

    // MINIMAX ALGORITHM FOR BEST AI PLAYER --> recursive
    let minimax = (board, player) => {
        // console.log('INSIDE MINIMAX')
        // change player every call. AI wants to maximize and human wants to minimize
        player === 'X' ? player = 'O' : player = 'X'

        // if game over, return the score as base case in recursion
        if(isWinner(board, 'X') || isWinner(board, 'O')){
            return getScore(board)
        }

        // set arrays to hold  moves and scores
        let scores = []
        let moves = []

        let possibleMoves = getAvailableMoves(board)

        // console.log('POSSIBLE MOVES', possibleMoves)
        
        // for each move we get a copy of the board if we make that move then get the minimax score
        // of that possible board. This will return +10 or -10 depending on player. we also save the 
        // move for that specific score in the move aray
        possibleMoves.forEach( (move) => {
            // console.log(move)
            let possbileBoard = getBoardWithMove(board,move, player)       // first round of possible boards will be O, but second round is X
            scores.push(minimax(possbileBoard, player))                         // scores from minimax determine the best move available
            moves.push(move)                                            // moves added into array to coorespond with scores index
        })

        // calculate max move or min move depending on player
        // the best score is returned so that the algorithm can
        // pick the best move at that point in the game
        if(player === 'O'){
            let maxIndex = getMaxIndex(scores)

            // new code from 9/30 to check for null move list
            if(moves.length === 0){
                return 0
            }

            let bestMove = moves[maxIndex]
            updateAiChoice(bestMove)                // set the AI move to the best move
            return scores[maxIndex]
        }
        else {
            let minIndex = getMinIndex(scores)
            if(moves.length === 0){
                return 0
            }

            let bestMove = moves[minIndex]
            updateAiChoice(bestMove)                // set the AI move to the best move            
            return scores[minIndex]
        }
    }

    let getMaxIndex = (array) => {
        let max = 0
        let index = 0
        for(let i = 0; i < array.length; i++){
            if(array[i] > max){
                index = i
                max = array[i]
            }
        }
        return index
    }
    
    let getMinIndex = (array) => {
        let min = 100
        let index = 0
        for(let i = 0; i < array.length; i++){
            if(array[i] < min){
                index = i
                min = array[i]
            }
        }
        return index
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