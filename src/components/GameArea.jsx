import React, { Component } from "react";
import Food from "./GameComponents/Food";
import Snake from "./GameComponents/Snake";
import Pause from "./GameComponents/Pause";
import GameOver from "./GameComponents/GameOver";

const getRandXY = () => {
  let max = 98;
  let x = Math.floor((Math.random() * max) / 2) * 2;
  let y = Math.floor((Math.random() * max) / 2) * 2;
  return [x, y];
};

const initialState = {
  score: 0,
  highScore: localStorage.getItem('highestScore') || 0,
  gameOver: false,
  pause: false,
  interval: undefined,
  snakeFood: getRandXY(),
  snakeSpeed: 200,
  movementDirectionBeforePause: undefined,
  movementDirection: "r",
  snakeBody: [
    [0, 0],
    [2, 0],
    [4, 0],
    [6, 0],
    [8, 0],
    [10, 0],
  ],
};

class GameArea extends Component {
  constructor(props) {
    super(props);
  }
  state = initialState;

  componentDidMount() {
    const interval = setInterval(this.moveSnake, this.state.snakeSpeed);
    this.setState({ interval });
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate(previous) {
    if (
      this.props.gameSpeed !== "default" &&
      this.props.gameSpeed !== this.state.snakeSpeed
    ) {
      this.setState({ snakeSpeed: this.props.gameSpeed });
    } else if (
      this.props.gameSpeed === "default" &&
      this.state.snakeSpeed !== 200 &&
      previous.gameSpeed !== "default"
    ) {
      console.log(previous);
      this.setState({ snakeSpeed: 200 });
    }
    if (!this.state.gameOver) {
      this.checkIfOutOfBorders();
      this.checkIfCollapsed();
      this.checkIfEatenSnakeFood();
    }
  }

  onKeyDown = (e) => {
    switch (e.keyCode) {
      case 32: //SPACE
        if (this.state.gameOver) {
          this.startGame();
        }
        break;
      case 27: //ESC
        if (!this.state.gameOver) {
          this.pauseClicked();
          this.props.handleOptionClick();
        }
        break;
      case 38: //up arrow
      case 87: // w - key
        if (this.state.movementDirection !== "d") {
          this.setState({ movementDirection: "u" });
        }
        break;
      case 40: //down arrow
      case 83: //s - key
        if (this.state.movementDirection !== "u") {
          this.setState({ movementDirection: "d" });
        }
        break;
      case 37: //left arrow
      case 65: //a - key
        if (this.state.movementDirection !== "r") {
          this.setState({ movementDirection: "l" });
        }
        break;
      case 39: //right arrow
      case 68: //d - key
        if (this.state.movementDirection !== "l") {
          this.setState({ movementDirection: "r" });
        }
        break;
      default:
        break;
    }
  };

  moveSnake = () => {
    let dots = [...this.state.snakeBody];
    let head = dots[dots.length - 1];
    switch (this.state.movementDirection) {
      case "r":
        head = [head[0] + 2, head[1]];
        break;
      case "u":
        head = [head[0], head[1] - 2];
        break;
      case "l":
        head = [head[0] - 2, head[1]];
        break;
      case "d":
        head = [head[0], head[1] + 2];
        break;
      default:
        break;
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeBody: dots,
    });
  };

  checkIfOutOfBorders() {
    let head = this.state.snakeBody[this.state.snakeBody.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  checkIfCollapsed() {
    let snake = [...this.state.snakeBody];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    });
  }

  onGameOver() {
    this.handleStorage();
    this.props.gameOverSound();
    clearInterval(this.state.interval);
    this.setState({ gameOver: true });
  }

  startGame() {
    // const { highScore } = this.state;
    this.setState(initialState);
    console.log(initialState.highScore)
    // this.setState({ highScore });
    const interval = setInterval(this.moveSnake, this.state.snakeSpeed);
    this.setState({ interval });
    this.props.handleGameStartMusic();
  }

  handleStorage() {
    localStorage.setItem('scoreBoard', localStorage.getItem('scoreBoard') + "," + this.state.score);
    localStorage.setItem('highestScore', this.state.highScore);
  }

  pauseClicked() {
    if (!this.state.pause) {
      clearInterval(this.state.interval);
    } else {
      let interval = setInterval(this.moveSnake, this.state.snakeSpeed);
      this.setState({ interval });
    }
    this.setState({ pause: !this.state.pause });
  }

  checkIfEatenSnakeFood() {
    let head = this.state.snakeBody[this.state.snakeBody.length - 1];
    const { snakeFood } = this.state;
    if (head[0] === snakeFood[0] && head[1] === snakeFood[1]) {
      this.props.foodEatSound();
      this.setState({ snakeFood: getRandXY() });
      this.manipulateScore();
      this.enlargeSnake();
      this.increaseSnakeSpeed();
      clearInterval(this.state.interval);
      const interval = setInterval(this.moveSnake, this.state.snakeSpeed);
      this.setState({ interval });
    }
  }

  manipulateScore() {
    let { score, highScore } = this.state;
    score += 1;
    if (score > highScore) {
      highScore = score;
    }
    this.setState({ score, highScore });
  }

  enlargeSnake() {
    const snake = [...this.state.snakeBody];
    snake.unshift([]);
    this.setState({ snakeBody: snake });
  }

  increaseSnakeSpeed() {
    const { snakeSpeed } = this.state;
    if (snakeSpeed > 50 && this.props.gameSpeed === "default") {
      this.setState({ snakeSpeed: snakeSpeed - 10 });
    }
  }

  render() {
    const { snakeColor, foodColor, gameAreaColor } = this.props;
    return (
      <div>
        <div className="game-area" style={{ backgroundColor: gameAreaColor }}>
          <Food dot={this.state.snakeFood} foodColor={foodColor} />
          <Snake snakeBody={this.state.snakeBody} snakeColor={snakeColor} />
          {this.state.pause ? <Pause /> : null}
          {this.state.gameOver ? <GameOver score={this.state.score} /> : null}
        </div>
        <div className="score-area">
          <h1 className="score">High score: {this.state.highScore}</h1>
          <h1 className="score">Your score: {this.state.score}</h1>
        </div>
      </div>
    );
  }
}

export default GameArea;
