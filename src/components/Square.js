import './Square.css'
const Square = (props) => {
    const value = "o"
  return (
    <button className="square" id={props.id}>{value}</button>
  )
}

export default Square