import { useContext } from 'react'
import BoardContext from './Context/BoardContext'
import './Square.css'
const Square = (props) => {
  const {context} = useContext(BoardContext)
  return (
    <button 
        onClick={() => context.actions.checkMove(props.location)}
        className="square" 
        id={props.id}>{props.value}</button>
  )
}

export default Square

let printLocation = (location) => {
  console.log(`Clicked at (${location[0]}, ${location[1]})`)
}