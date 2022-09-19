import BoardContext from './Context/BoardContext'
import { useContext } from 'react'
import Square from './Square'
import './Board.css'
const Board = () => {
    const {context} = useContext(BoardContext)
    return (
        <section className="board">
            {loadBoard(context.state.boardData)}
        </section>
    )
}

let loadBoard = (boardData) => {        // parameter is state passed from context
    const squares = []                  // create a list for <Square />'s
    let squareIDs = [                   // IDs used for stlying borders
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
    ]
    for (let i = 0; i < 3; i++){            // loop data to create <Square/>'s
        for (let j = 0; j < 3; j++){
            let value = boardData[i][j]     // get current board data to render    
            let id = squareIDs[i][j]        // ids for styling boarders
            squares.push(
                <Square value={value} id={id} key={id} location={[i,j]}/>
            )
        }
    }
    return squares      // returns a list of <Square /> componets
}
export default Board