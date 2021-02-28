import React from "react";

const Food = ({dot, foodColor}) => {
  const style = {
    left: `${dot[0]}%`,
    top: `${dot[1]}%`,
    backgroundColor: foodColor,
    borderColor: foodColor
  };
  return <div className="snake-food" style={style}/>;
};

export default Food;
