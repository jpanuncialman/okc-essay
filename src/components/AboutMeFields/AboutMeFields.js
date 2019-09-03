import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { FIELDS } from "../../constants";

import AboutMeField from "../AboutMeField/AboutMeField";

class AboutMeFields extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    fieldOrder: PropTypes.array.isRequired
  };

  renderFields = () => {
    return this.props.fieldOrder.map((fieldId, ind) => {
      return (
        <AboutMeField
          key={`field-${ind}`}
          id={fieldId}
          question={FIELDS[fieldId]}
        />
      );
    });
  };

  render() {
    return (
      <div className="okc-app__about-me-fields">{this.renderFields()}</div>
    );
  }
}

function mapStateToProps(state) {
  const { fieldOrder } = state;
  return { fieldOrder };
}

export default connect(mapStateToProps)(AboutMeFields);
