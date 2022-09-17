import './Square.css'
const Square = (props) => {
  return (
    <button onClick={() => printLocation(props.location)} className="square" id={props.id}>{props.value}</button>
  )
}

export default Square

let printLocation = (location) => {
  console.log(`Clicked at (${location[0]}, ${location[1]})`)
}