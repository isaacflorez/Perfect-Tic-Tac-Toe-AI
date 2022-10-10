import './Hero.css'
import BoardContext from './Context/BoardContext'
import { useContext } from 'react'
const Hero = () => {
  const { context } = useContext(BoardContext)
  return (
    <section className="hero">
        <h1 className="hero_title">tic tac toe</h1>
        <p className="hero_sub_title">who goes first?</p>
        <div className="player_selection">
          <button onClick={ () => context.actions.updateStartingPlayer('O') } >ai</button>
          <button onClick={ () => context.actions.updateStartingPlayer('X') } >me</button>
        </div>
    </section>
  )
}

export default Hero