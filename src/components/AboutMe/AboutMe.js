import React, { Component } from "react";
import { connect } from "react-redux";

import AboutMeFields from "../AboutMeFields/AboutMeFields";

class AboutMe extends Component {
  render() {
    return (
      <div className="okc-app__about-me-container">
        <h2 className="okc-app__about-me-header">About Me</h2>
        <AboutMeFields />
      </div>
    );
  }
}

export default connect()(AboutMe);
