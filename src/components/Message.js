import './Message.css'
const Message = () => {
    const message = "may the gods protect you"
    return (
        <section className='gameover'>
            <p className="gameover_message">{message}</p>
            <button className="reset_board">reset board</button>
        </section>
    )
}

export default Message