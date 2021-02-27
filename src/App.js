import React, { Component } from "react";
import Snake from "./Snake";
import Food from "./Food";
import Pause from "./Pause";
import GameOver from "./GameOver";


const getRandXY = () => {
  let max = 98;
  let x = Math.floor((Math.random() * max) / 2) * 2;
  let y = Math.floor((Math.random() * max) / 2) * 2;
  return [x, y];
};

const initialState = {
  score: 0,
  highScore: 0,
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

class App extends Component {
  state = initialState;

  componentDidMount() {
    const interval = setInterval(this.moveSnake, this.state.snakeSpeed)
    this.setState({interval});
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    if(!this.state.gameOver){
      this.checkIfOutOfBorders();
      this.checkIfCollapsed();
      this.checkIfEatenSnakeFood();
    }
  }

  onKeyDown = (e) => {
    switch (e.keyCode) {
      case 32: //SPACE
        if(this.state.gameOver){
          this.startGame();
        }
        break;
      case 27: //ESC
        this.pauseClicked()
        break;
      case 38: //up arrow
      case 87: // w - key
        if(this.state.movementDirection !== 'd') {
          this.setState({movementDirection: "u"});
        }
        break;
      case 40: //down arrow
      case 83: //s - key
        if(this.state.movementDirection !== 'u') {
          this.setState({movementDirection: "d"});
        }
        break;
      case 37: //left arrow
      case 65: //a - key
        if(this.state.movementDirection !== 'r') {
          this.setState({movementDirection: "l"});
        }
        break;
      case 39: //right arrow
      case 68: //d - key
        if(this.state.movementDirection !== 'l') {
          this.setState({movementDirection: "r"});
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
    clearInterval(this.state.interval);
    this.setState({gameOver: true});
  }

  startGame(){
    const {highScore} = this.state;
    this.setState(initialState)
    this.setState({highScore})
    const interval = setInterval(this.moveSnake, this.state.snakeSpeed);
    this.setState({interval});
  }

  pauseClicked() {
    if(!this.state.pause){
      clearInterval(this.state.interval)
    } else{
      let interval = setInterval(this.moveSnake, this.state.snakeSpeed)
      this.setState({interval})
    }
    this.setState({pause: !this.state.pause})
  }

  checkIfEatenSnakeFood() {
    let head = this.state.snakeBody[this.state.snakeBody.length - 1];
    const { snakeFood } = this.state;
    if (head[0] === snakeFood[0] && head[1] === snakeFood[1]) {
      this.setState({ snakeFood: getRandXY() });
      this.manipulateScore();
      this.enlargeSnake();
      this.increaseSnakeSpeed();
      clearInterval(this.state.interval);
      const interval = setInterval(this.moveSnake, this.state.snakeSpeed);
      this.setState({interval})
    }
  }

  manipulateScore(){
    let {score, highScore} = this.state
    score += 1;
    if(score > highScore){
      highScore = score;
    }
    this.setState({score, highScore})
  }

  enlargeSnake() {
    const snake = [...this.state.snakeBody];
    snake.unshift([]);
    this.setState({ snakeBody: snake });
  }

  increaseSnakeSpeed() {
    const { snakeSpeed } = this.state;
    if (snakeSpeed > 50) {
      this.setState({ snakeSpeed: snakeSpeed - 10 });
    }
  }

  render() {
    return (
        <>
          <div className="game-area">
            <Food dot={this.state.snakeFood} />
            <Snake snakeBody={this.state.snakeBody} />
            {this.state.pause ? <Pause /> : null}
            {this.state.gameOver ? <GameOver score={this.state.score}/> : null}
          </div>
          <div className="score-area">
            <h1 className="score">High score: {this.state.highScore}< /h1>
            <h1 className="score">Your score: {this.state.score}</h1>
          </div>
        </>
    );
  }
}

export default App;
