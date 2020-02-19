import React from "react";

function currentYear() {
  return new Date().getFullYear();
}

function Footer() {
  return (
    <footer className="footer">
      <div className="text-center">
        &copy; {currentYear()} Copyright:{" "}
        <a
          href="https://github.com/RenanTKN"
          target="_blank"
          rel="noopener noreferrer"
        >
          RenanTKN
        </a>{" "}
        - Image:{" "}
        <a
          href="https://pixabay.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          pixabay
        </a>
      </div>
    </footer>
  );
}

export default Footer;
