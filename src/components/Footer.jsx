import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        position: "absolute",
        bottom: 0,
        display: "flex",
      }}
    >
      <a href="https://github.com/Donish99">
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png"
          alt="gitLogo"
          height="20px"
        />
      </a>
      |
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
