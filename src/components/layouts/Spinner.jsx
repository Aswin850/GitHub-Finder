import React from "react";
import PropTypes from "prop-types";
import spinner from "./assests/spinner.gif";

function Spinner(props) {
  return (
    <div className="w-100 mt-20">
      <img
        src={spinner}
        alt="Loading..."
        width={180}
        className="text-center mx-auto"
      />
    </div>
  );
}

Spinner.propTypes = {};

export default Spinner;
