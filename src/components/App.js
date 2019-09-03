import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import AboutMe from "./AboutMe/AboutMe";
import Essay from "./Essay/Essay";

require("./App.scss");

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired
  };

  render() {
    return (
      <div className="okc-app-container">
        <div
          className={
            !this.props.isEditing ? "okc-app" : "okc-app okc-app__expand-essay"
          }
        >
          <div className="okc-app__section okc-app__section__about-me">
            <AboutMe />
          </div>
          <div className="okc-app__section okc-app__section__essay">
            <Essay />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isEditing } = state;
  return { isEditing };
}

export default connect(mapStateToProps)(App);
