import Hero from "./Hero"
import Board from './Board'
import Message from "./Message"
import { useState } from "react"
const Game = () => {
  // boardData is passed to Board in order to render squares
  const [boardData, setBoardData] = useState(
    [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
  )
  return (
    <>
        <Hero />
        <Board squares={boardData}/>
        <Message />
    </>
  )
}

export default Game