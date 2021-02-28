import React, { Component } from "react";
import Game from "./components/Game";
import Settings from "./components/Settings";
import background from "./background.mp3";
import gameOverSound from "./gameOver.wav";
import foodEatSound from "./eat.mp3";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  state = {
    display: false,
    snakeColor: "#0350a0",
    foodColor: "#ff0059",
    gameAreaColor: "#6eda20",
    gameSpeed: "default",
    music: false,
    effects: true,
  };

  music = new Audio(background);
  gameOverSoundEffect = new Audio(gameOverSound);
  foodEatSoundEffect = new Audio(foodEatSound);

  handleOptionClick = () => {
    this.setState({ display: !this.state.display });
  };

  changeGameAreaColor = (e) => {
    this.setState({ gameAreaColor: e.target.value });
  };

  changeSnakeColor = (e) => {
    this.setState({ snakeColor: e.target.value });
  };

  changeFoodColor = (e) => {
    this.setState({ foodColor: e.target.value });
  };

  changeGameSpeed = (e) => {
    const options = ["default", 200, 150, 100, 50];
    this.setState({ gameSpeed: options[e.target.value] });
  };

  handleMusic = () => {
    if (!this.state.music) {
      console.log(123);
      this.music.play();
      this.music.addEventListener(
        "ended",
        function () {
          this.currentTime = 0;
          this.play();
        },
        false
      );
    } else {
      this.music.pause();
    }
    this.setState({ music: !this.state.music });
  };

  handleEffect = () => {
    this.setState({ effects: !this.state.effects });
  };

  gameOverSound = async () => {
    if (this.state.effects) {
      if (this.state.music) {
        this.music.currentTime = 0;
        this.music.pause();
      }
      await this.gameOverSoundEffect.play();
    }
  };

  handleGameStartMusic = () => {
    if (this.state.music) this.music.play();
  };

  foodEatSound = async () => {
    if (this.state.effects) {
      await this.foodEatSoundEffect.play();
    }
  };

  render() {
    const { snakeColor, foodColor, gameAreaColor, gameSpeed } = this.state;
    return (
      <div className="container">
        <div className="row mt-3">
          <div className="col-2">
            <Settings
              music={this.state.music}
              effects={this.state.effects}
              display={this.state.display}
              snakeColor={this.state.snakeColor}
              foodColor={this.state.foodColor}
              gameAreaColor={this.state.gameAreaColor}
              changeSnakeColor={this.changeSnakeColor}
              changeFoodColor={this.changeFoodColor}
              changeGameAreaColor={this.changeGameAreaColor}
              changeGameSpeed={this.changeGameSpeed}
              handleEffect={this.handleEffect}
              handleMusic={this.handleMusic}
            />
          </div>
          <div className="col-9 mr-5">
            <Game
              foodEatSound={this.foodEatSound}
              gameOverSound={this.gameOverSound}
              handleGameStartMusic={this.handleGameStartMusic}
              pause={this.state.display}
              snakeColor={snakeColor}
              foodColor={foodColor}
              gameAreaColor={gameAreaColor}
              gameSpeed={gameSpeed}
              handleOptionClick={this.handleOptionClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
