import BoardContext from './Context/BoardContext'
import { useContext } from 'react'
import './Message.css'
const Message = () => {
    const {context} = useContext(BoardContext)
    return (
        <section className='gameover'>
            <p className="gameover_message">{context.state.message}</p>
            <button onClick={() => context.actions.cleanBoard()} className="reset_board">reset board</button>
        </section>
    )
}

export default Message