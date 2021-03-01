import React, {Component} from "react";
import GameArea from "./GameArea";
import Settings from "./Settings";
import background from "../sounds/background.mp3";
import gameOverSound from "../sounds/gameOver.wav";
import foodEatSound from "../sounds/eat.mp3";
import Statistics from "./Statistics";

class Game extends Component{
    state = {
        display: false,
        snakeColor: "#0350a0",
        foodColor: "#ff0059",
        gameAreaColor: "#6eda20",
        gameSpeed: "default",
        isMusic: false,
        isEffects: true,
        music: new Audio(background),
        gameOverSoundEffect: new Audio(gameOverSound),
        foodEatSoundEffect: new Audio(foodEatSound),
    };

    componentDidMount() {
        document.onkeypress = this.hotKeys;
    }

    hotKeys = (e) => {
        switch (e.keyCode){
            case 112: // P
                this.handleMusic()
                break;
            case 111: // P
                this.handleEffect()
                break;
            default:
                break;
        }
    }

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

    changeMusicVolume = (e) => {
        this.state.music.volume = e.target.value;
    }

    changeEffectsVolume = (e) => {
        this.state.foodEatSoundEffect.volume = e.target.value
        this.state.gameOverSoundEffect.volume = e.target.value
    }

    handleMusic = () => {
        if (!this.state.isMusic) {
            this.state.music.play();
            this.state.music.addEventListener(
                "ended",
                function () {
                    this.currentTime = 0;
                    this.play();
                },
                false
            );
        } else {
            this.state.music.pause();
        }
        this.setState({ isMusic: !this.state.isMusic });
    };

    handleEffect = () => {
        this.setState({ isEffects: !this.state.isEffects });
    };

    gameOverSound = async () => {
        if (this.state.isEffects) {
            if (this.state.isMusic) {
                this.state.music.currentTime = 0;
                this.state.music.pause();
            }
            await this.state.gameOverSoundEffect.play();
        }
    };

    handleGameStartMusic = () => {
        if (this.state.isMusic) this.state.music.play();
    };

    foodEatSound = async () => {
        if (this.state.isEffects) {
            await this.state.foodEatSoundEffect.play();
        }
    };

    render() {
        const { snakeColor, foodColor, gameAreaColor, gameSpeed } = this.state;
        return (
            <div className="container">
                <div className="row mt-3 ">
                    <div className="col-2">
                        <Settings
                            music={this.state.isMusic}
                            effects={this.state.isEffects}
                            display={this.state.display}
                            snakeColor={this.state.snakeColor}
                            foodColor={this.state.foodColor}
                            gameAreaColor={this.state.gameAreaColor}
                            changeSnakeColor={this.changeSnakeColor}
                            changeFoodColor={this.changeFoodColor}
                            changeGameAreaColor={this.changeGameAreaColor}
                            changeGameSpeed={this.changeGameSpeed}
                            changeMusicVolume={this.changeMusicVolume}
                            changeEffectsVolume={this.changeEffectsVolume}
                            handleEffect={this.handleEffect}
                            handleMusic={this.handleMusic}
                        />
                    </div>
                    <div className="col-8 mr-5">
                        <GameArea
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
                    <div className="col">
                        <Statistics/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game