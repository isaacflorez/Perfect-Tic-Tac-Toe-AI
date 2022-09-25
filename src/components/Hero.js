import './Hero.css'
const Hero = () => {
  return (
    <section className="hero">
        <h1 className="hero_title">tic tac toe</h1>
        <p className="hero_sub_title">beat me if you can (:</p>
        <div className="player_selection">
          <button>ai starts</button>
          <button>human starts</button>
        </div>
        

    </section>
  )
}

export default Hero