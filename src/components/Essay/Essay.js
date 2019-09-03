import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { saveEssay, toggleIsEditing } from "../../madlibs";

import "./Essay.scss";
class Essay extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    essayRender: PropTypes.array.isRequired,
    essayText: PropTypes.string.isRequired,
    fieldAnswers: PropTypes.object.isRequired,
    fieldOrder: PropTypes.array.isRequired,
    isEditing: PropTypes.bool.isRequired
  };

  constructor() {
    super();

    this.state = {
      essayText: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.essayRender !== this.props.essayRender) {
      this.setState({
        essayText: this.props.essayRender.join(" ").replace(/(<([^>]+)>)/gi, "")
      });
    }

    if (prevProps.isEditing !== this.props.isEditing) {
      if (!this.props.isEditing) this.setState({ essayText: "" });
    }
  }

  handleEssayTextChange = e => {
    this.setState({ essayText: e.target.value });
  };

  render() {
    return (
      <div className="okc-app__essay-container">
        <h3 className="okc-app__essay-header">Your essay text</h3>
        {this.props.isEditing ? (
          <textarea
            className="okc-app__essay-body okc-app__essay-body__textarea"
            onBlur={() => this.props.dispatch(saveEssay(this.state.essayText))}
            onChange={this.handleEssayTextChange}
            value={this.state.essayText}
          ></textarea>
        ) : (
          <p
            className="okc-app__essay-body"
            dangerouslySetInnerHTML={{
              __html: this.props.essayRender.join(" ")
            }}
          ></p>
        )}
        {Object.keys(this.props.fieldAnswers).length >= 5 ? (
          <div className="okc-app__essay-button-container">
            <button
              onClick={() => this.props.dispatch(toggleIsEditing())}
              className="okc-app__essay-button"
            >
              {this.props.isEditing ? "Start Over" : "Edit"}
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { essayRender, essayText, fieldAnswers, fieldOrder, isEditing } = state;
  return { essayRender, essayText, fieldAnswers, fieldOrder, isEditing };
}

export default connect(mapStateToProps)(Essay);
