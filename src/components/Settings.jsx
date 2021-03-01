import React from "react";

const Settings = (props) => {
  const {
    music,
    effects,
    display,
    snakeColor,
    foodColor,
    gameAreaColor,
  } = props;
  const {
    changeSnakeColor,
    changeFoodColor,
    changeGameAreaColor,
    changeGameSpeed,
    changeMusicVolume,
    changeEffectsVolume
  } = props;
  const { handleEffect, handleMusic } = props;
  return (
    <div
      className="options-container"
      style={display ? { display: "block" } : { display: "none" }}
    >
      <div className="options">
        <button
          id="music"
          className={`btn btn-${music ? "primary" : "secondary"} btn-sm`}
          onClick={() => handleMusic()}
        >
          music
        </button>
        <input type="range" min="0" max="1" step={0.1} id="vol-control" onChange={e => changeMusicVolume(e)}/>
        <button
          id="effects"
          className={`btn btn-${effects ? "primary" : "secondary"} btn-sm`}
          onClick={() => handleEffect()}
        >
          sounds
        </button>
        <input type="range" min="0" max="1" step={0.1} id="vol-control" onChange={e => changeEffectsVolume(e)}/>
        <label className="input-group-text" htmlFor="snake">
          Color of snake
        </label>
        <input
          className="form-control form-control-color"
          id="snake"
          type="color"
          value={snakeColor}
          onChange={(e) => changeSnakeColor(e)}
        />
        <label className="input-group-text" htmlFor="food">
          Color of food
        </label>
        <input
          className="form-control form-control-color"
          id="food"
          type="color"
          value={foodColor}
          onChange={(e) => changeFoodColor(e)}
        />
        <label className="input-group-text" htmlFor="area">
          Color of area
        </label>
        <input
          className="form-control form-control-color"
          id="area"
          type="color"
          value={gameAreaColor}
          onChange={(e) => changeGameAreaColor(e)}
        />
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="speed">
            GameArea speed:
          </label>
          <select
            id="speed"
            name="Game speed"
            onChange={(e) => changeGameSpeed(e)}
          >
            <option value="0">default</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;
