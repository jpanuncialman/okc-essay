import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { generateRandomInt, getTextTemplates } from "../../helpers";
import { submitField } from "../../madlibs";

import "./AboutMeField.scss";

class AboutMeField extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    fieldAnswers: PropTypes.object.isRequired,
    isEditing: PropTypes.bool.isRequired
  };

  constructor() {
    super();
    //Maintaining local state to handle onChange for input field
    this.state = {
      answer: ""
    };
  }

  componentDidUpdate(prevProps) {
    //Clears fields if edit button is clicked.
    //This ensures there are no issues modifying
    if (prevProps.isEditing !== this.props.isEditing) {
      if (this.props.isEditing) this.setState({ answer: "" });
    }
  }

  handleOnChange = e => {
    this.setState({ answer: e.target.value });
  };

  getSentence = () => {
    const sentenceArr = getTextTemplates(this.props.id);
    const randomInd = generateRandomInt(0, sentenceArr.length - 1);
    const answer = this.state.answer;
    return sentenceArr[randomInd].replace("$answer", answer);
  };

  render() {
    // const dispatch = this.props.dispatch;
    const sentence = this.getSentence();
    return (
      <div className="okc-app__about-me-field">
        <h3 className="okc-app__about-me-field__question">
          {this.props.question}
        </h3>
        <input
          type="text"
          value={this.state.answer}
          onChange={this.handleOnChange}
          onBlur={() => {
            //Only dispatch on change in value
            if (
              (!this.props.fieldAnswers[this.props.id] &&
                // this.props.fileAnswers[this.props.id].answer &&
                this.state.answer !== "") ||
              (this.props.fieldAnswers[this.props.id] &&
                this.state.answer !==
                  this.props.fieldAnswers[this.props.id].answer)
            ) {
              this.props.dispatch(
                submitField({
                  id: this.props.id,
                  answer: this.state.answer,
                  sentence: sentence
                })
              );
            }
          }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { fieldAnswers, isEditing } = state;
  return { fieldAnswers, isEditing };
}

export default connect(mapStateToProps)(AboutMeField);
