import React, { useState } from 'react'

const BoardContext = React.createContext()
export function ListProvider({ children }){
    const [boardData, setBoardData] = useState(
        [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
          ]
    )
    let printLocation = (location) => {
        console.log(`Clicked at (${location[0]}, ${location[1]})`)
      }
    const context = {
        actions: {printLocation},
        state: {boardData, setBoardData}
    }

    return (
        <BoardContext.Provider value={{context}}>
            {children}
        </BoardContext.Provider>
    )
}

export default BoardContext