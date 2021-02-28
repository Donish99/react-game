import React from "react";

const Snake = ({snakeBody, snakeColor}) => {
  return (
    <div>
      {snakeBody.map((dot, i) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`,
          backgroundColor: snakeColor,
          borderColor: snakeColor
        };
        return <div className="snake-dot" key={i} style={style}/>;
      })}
    </div>
  );
};

export default Snake;
