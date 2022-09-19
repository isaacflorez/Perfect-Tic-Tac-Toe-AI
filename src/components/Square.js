import { useContext } from 'react'
import BoardContext from './Context/BoardContext'
import './Square.css'
const Square = (props) => {
  const {context} = useContext(BoardContext)
  return (
    <button 
        onClick= { () => context.actions.checkMove(props.location[0], props.location[1])}
        className="square" 
        id={props.id}>{props.value}
    </button>
  )
}

export default Square
