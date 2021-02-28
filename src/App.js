import React, { Component } from "react";
import Game from "./components/Game";
import background from './background.mp3'
import gameOverSound from './gameOver.wav';
import foodEatSound from './eat.mp3';

class App extends Component {
  state = {
    display: false,
    snakeColor: "#0350a0",
    foodColor: "#ff0059",
    gameAreaColor: "#6eda20",
    gameSpeed: "default",
    music: true,
    effects: true,
  }

  music = new Audio(background);
  gameOverSoundEffect = new Audio(gameOverSound);
  foodEatSoundEffect = new Audio(foodEatSound);

  handleOptionClick = () => {
    this.setState({display: !this.state.display})
  }

  changeGameAreaColor(e){
    this.setState({gameAreaColor: e.target.value});
  }

  changeSnakeColor(e){
    this.setState({snakeColor: e.target.value})
  }

  changeFoodColor(e){
    this.setState({foodColor: e.target.value})
  }

  changeGameSpeed(e){
    const options = ["default", 200, 150, 100, 50]
    this.setState({gameSpeed:options[e.target.value]})
  }

  handleMusic() {
    if(this.state.music){
      this.music.play()
      this.music.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
      }, false);
    }else{
      this.music.pause();
    }
    this.setState({music: !this.state.music});
  }

  handleEffect(){
    this.setState({effects: !this.state.effects});
  }

  gameOverSound = async() => {
    if(this.state.effects){
      if(this.state.music) await this.music.pause();
      await this.gameOverSoundEffect.play()
      await this.music.play()
    }
  }

  foodEatSound = async () => {
    if(this.state.effects){
      if(this.state.music) await this.music.pause();
      await this.foodEatSoundEffect.play()
      await this.music.play();
    }
  }

  render() {
    const {snakeColor, foodColor, gameAreaColor, gameSpeed} = this.state
    return (
        <>
          <Game
              foodEatSound={this.foodEatSound}
              gameOverSound={this.gameOverSound}
              pause={this.state.display}
              snakeColor={snakeColor}
              foodColor={foodColor}
              gameAreaColor={gameAreaColor}
              gameSpeed={gameSpeed}
              handleOptionClick={this.handleOptionClick}
          />
          <div className="options-container" style={this.state.display ? {display: "block"} : {display:"none"}}>
            <div className="options" >
              <label htmlFor="snake">Color of snake</label>
              <input id="snake" type="color" value={this.state.snakeColor} onChange={ e => this.changeSnakeColor(e)}/>
              <label htmlFor="food">Color of food</label>
              <input id="food" type="color" value={this.state.foodColor} onChange={ e => this.changeFoodColor(e)}/>
              <label htmlFor="area">Color of area</label>
              <input id="area" type="color" value={this.state.gameAreaColor } onChange={ e => this.changeGameAreaColor(e)}/>
              <label htmlFor="speed">Game speed:</label>
              <select id="speed" name="Game speed" onChange={e => this.changeGameSpeed(e)}>
                <option value="0">default</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <button onClick={() => this.handleMusic()}>music</button>
              <button onClick={() => this.handleEffect()}>effect</button>
            </div>
          </div>
        </>
    )
  }
}

export default App;
