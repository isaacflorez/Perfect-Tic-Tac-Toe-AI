import React, { useState, useEffect } from 'react'

const BoardContext = React.createContext()
export function ListProvider({ children }){
    const [message, setMessage] = useState('may luck be in your favor')
    const [currentPlayer, setCurrentPlayer] = useState('O')
    const [gameOver, setGameOver] = useState(false)
    const [boardData, setBoardData] = useState(
        [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
    )
    const WINNING_COMBOS = [
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
        if(isWinner()){
            setMessage(`${currentPlayer} is the winner`)
            setGameOver(true)
            // setCurrentPlayer('X')
        } 
        else changePlayer()
    }, [boardData])


    // updates current player
    let changePlayer = () => {
        currentPlayer === 'X'
        ? setCurrentPlayer('O') 
        : setCurrentPlayer('X')
    }


    // see if move is valid or not
    let checkMove = (location) => {
        if (!gameOver){
            let [x, y] = [location[0], location[1]]     // get coordinates
            if(boardData[x][y] === ''){                 // check if spot on the board is empty
                addMoveToBoard(x,y)                     // update board with new move
            }
        } else alert('reset board to play again')                      
    }


    // take given coordinates and add move for curr player
    let addMoveToBoard = (x,y) => {
        let temp = [...boardData]       // copy current board
        temp[x][y] = currentPlayer      // mark square
        setBoardData(temp)
    }


    // check if board contains any of the winning combos
    // FIND A BETTER WAY TO DO THIS (:
    let isWinner = () => {
        let n = WINNING_COMBOS.length
        for(let i = 0; i < n; i++){
            let combo = WINNING_COMBOS[i]
            let a = boardData[combo[0][0]][combo[0][1]]
            let b = boardData[combo[1][0]][combo[1][1]]
            let c = boardData[combo[2][0]][combo[2][1]]
            if(a !== '' && a === b && b === c){
                return true
            }
        }
        return false
    }


    let cleanBoard = () => {        // resets board with empty values
        setBoardData(
            [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ]
        )
        setGameOver(false)
        setCurrentPlayer('X')
        setMessage('may luck be in your favor')
    }


    const context = {
        actions: {checkMove, cleanBoard},
        state: {boardData, setBoardData, message}
    }


    return (
        <BoardContext.Provider value={{context}}>
            {children}
        </BoardContext.Provider>
    )
}
export default BoardContext