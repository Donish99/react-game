import React from "react";
import linkedIn from "../images/linkedin.png";
import github from "../images/github.png";

const Footer = () => {
  return (
    <footer
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        display: "flex",
      }}
    >
      <a href="https://www.linkedin.com/in/akhmadullo-nurmakhamatov-8165111b3/">
        <img src={linkedIn} alt="LikedIn" height="20px" />
      </a>
      <a href="https://github.com/Donish99">
        <img src={github} alt="gitLogo" height="20px" />
      </a>
      <a href="https://rs.school/js/">
        <img
          src="https://rs.school/images/rs_school_js.svg"
          alt="rsLogo"
          height="20px"
        />
      </a>
    </footer>
  );
};

export default Footer;
