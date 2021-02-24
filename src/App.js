import React, { Component } from "react";
import Snake from "./Snake";
import Food from "./Food";

const getRandXY = () => {
  let max = 98;
  let x = Math.floor((Math.random() * max) / 2) * 2;
  let y = Math.floor((Math.random() * max) / 2) * 2;
  return [x, y];
};

const initialState = {
  snakeFood: getRandXY(),
  snakeSpeed: 200,
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
    setInterval(this.moveSnake, this.state.snakeSpeed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEatenSnakeFood();
  }

  onKeyDown = (e) => {
    switch (e.keyCode) {
      case 38:
        if(this.state.movementDirection !== 'd') {
          this.setState({movementDirection: "u"});
        }
        break;
      case 40:
        if(this.state.movementDirection !== 'u') {
          this.setState({movementDirection: "d"});
        }
        break;
      case 37:
        if(this.state.movementDirection !== 'r') {
          this.setState({movementDirection: "l"});
        }
        break;
      case 39:
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
    alert(`Game Over. Snake length is ${this.state.snakeBody.length}`);
    this.setState(initialState);
  }

  checkIfEatenSnakeFood() {
    let head = this.state.snakeBody[this.state.snakeBody.length - 1];
    const { snakeFood } = this.state;
    if (head[0] === snakeFood[0] && head[1] === snakeFood[1]) {
      this.setState({ snakeFood: getRandXY() });
      this.enlargeSnake();
      this.increaseSnakeSpeed();
    }
  }

  enlargeSnake() {
    const snake = [...this.state.snakeBody];
    snake.unshift([]);
    this.setState({ snakeBody: snake });
  }

  increaseSnakeSpeed() {
    const { snakeSpeed } = this.state;
    if (snakeSpeed > 10) {
      this.setState({ snakeSpeed: snakeSpeed - 10 });
    }
  }

  render() {
    return (
      <div className="game-area">
        <Snake snakeBody={this.state.snakeBody} />
        <Food dot={this.state.snakeFood} />
      </div>
    );
  }
}

export default App;
