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
/*
loadBoard() takes in the boardData state context and
uses it to create a list of <Square/> components to render
into the <Board /> component. If state in context changes,
the game board should change as well and represent that
*/
let loadBoard = (boardData) => {
    const squares = []      // list for <Square />'s
    let squareIDs = [       // IDs used for stlying borders
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
    ]
    for (let i = 0; i < 3; i++){            // loop data to create <Square/>'s
        for (let j = 0; j < 3; j++){
            let value = boardData[i][j]
            let id = squareIDs[i][j]
            squares.push(
                <Square value={value} id={id} key={id} location={[i,j]}/>
            )
        }
    }
    return squares
}
export default Board