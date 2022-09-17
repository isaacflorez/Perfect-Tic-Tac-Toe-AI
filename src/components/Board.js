import Square from './Square'
import './Board.css'
const Board = ({ squares }) => {
    return (
        <section className="board">
            {loadBoard(squares)}
        </section>
    )
}
/*
loadBoard() takes in the boardData state from Game.js and
uses it to create a list of <Square/> components to render
into the <Board /> component. If state in Game.js changes,
the game board should change as well and represent that
*/
let loadBoard = (boardData) => {
    const squares = []
    let squareIDs = [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
    ]
    for (let i = 0; i < 3; i++){
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