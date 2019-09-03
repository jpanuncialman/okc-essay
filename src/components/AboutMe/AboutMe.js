import React, { Component } from "react";
import { connect } from "react-redux";

import AboutMeFields from "../AboutMeFields/AboutMeFields";

class AboutMe extends Component {
  render() {
    return (
      <div className="okc-app__about-me-container">
        <h3 className="okc-app__about-me-header">About Me</h3>
        <AboutMeFields />
      </div>
    );
  }
}

export default connect()(AboutMe);
