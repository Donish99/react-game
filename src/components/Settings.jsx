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
        <button
          id="effects"
          className={`btn btn-${effects ? "primary" : "secondary"} btn-sm m-2`}
          onClick={() => handleEffect()}
        >
          effect
        </button>
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
            Game speed:
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
