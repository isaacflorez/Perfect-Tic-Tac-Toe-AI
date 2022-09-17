import React, { useState } from 'react'

const BoardContext = React.createContext()
export function ListProvider({ children }){
    const [currentPlayer, setCurrentPlayer] = useState('x')
    const [boardData, setBoardData] = useState(
        [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
    )

    let checkMove = (location) => {                                   
        let [x, y] = [location[0], location[1]]     // get coordinates
        if(boardData[x][y] === ''){                 // check if spot on the board is empty
            setBoardData(addMoveToBoard(x,y))       // update board with new move
        } else {
            console.log('clicked filled space')
        }
    }

    let addMoveToBoard = (x,y) => {
        let temp = boardData            // copy current board
        temp[x][y] = currentPlayer      // mark square
        currentPlayer === 'x'           // change player
            ? setCurrentPlayer('o') 
            : setCurrentPlayer('x')
        return temp                     // return copy
    }

    let cleanBoard = () => {        // resets board with empty values
        setBoardData(
            [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ]
        )
    }
    
    const context = {
        actions: {checkMove, cleanBoard},
        state: {boardData, setBoardData}
    }

    return (
        <BoardContext.Provider value={{context}}>
            {children}
        </BoardContext.Provider>
    )
}

export default BoardContext