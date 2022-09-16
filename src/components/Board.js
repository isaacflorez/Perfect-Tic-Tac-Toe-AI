import Square from './Square'
import './Board.css'
const Board = () => {
    let squareIndexs = ['a','b','c','d','e','f','g','h','i']
    return (
        <section className="board">
            {squareIndexs.map((id) => {
                return <Square id={id} key={id}/>
            })}
        </section>
    )
}

export default Board