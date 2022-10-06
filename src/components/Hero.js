import './Hero.css'
import BoardContext from './Context/BoardContext'
import { useContext } from 'react'
const Hero = () => {
  const { context } = useContext(BoardContext)
  return (
    <section className="hero">
        <h1 className="hero_title">tic tac toe</h1>
        <p className="hero_sub_title">beat me if you can (:</p>
        <div className="player_selection">
          <button onClick={ () => context.actions.updateStartingPlayer('O') } >ai starts</button>
          <button onClick={ () => context.actions.updateStartingPlayer('X') } >human starts</button>
        </div>
    </section>
  )
}

export default Hero