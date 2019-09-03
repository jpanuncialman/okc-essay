import { FIELD_NAMES } from "./constants";
// import { saveEssay } from "./helpers";

import { checkIfAnswerIsFirstWord, capitalizeWord } from "./helpers";

// Action types
// ----------------------------------------------------------------------------

export const MODIFY_ESSAY = "MADLIBS.MODIFY_ESSAY";
export const SAVE_ESSAY = "MADLIBS.SAVE_ESSAY";
export const SUBMIT_FIELD = "MADLIBS.SUBMIT_FIELD";
export const TOGGLE_IS_EDITING = "MADLIBS.TOGGLE_IS_EDITING";
export const INCREMENT_COUNTER = "MADLIBS.INCREMENT_COUNTER";

// Initial state
// ----------------------------------------------------------------------------

export const INITIAL_STATE = {
  fieldOrder: [
    FIELD_NAMES.hometown,
    FIELD_NAMES.favoriteFood,
    FIELD_NAMES.loveToDo,
    FIELD_NAMES.music,
    FIELD_NAMES.messageIf
    // FIELD_NAMES.bar
  ],
  fieldAnswers: {},
  essayRender: [],
  essayText: "",
  isEditing: false,
  counter: 1
};

// Reducer
// ----------------------------------------------------------------------------

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case MODIFY_ESSAY: {
      // Creates array of sentences and sorts per specified fieldOrder
      //Also ads <strong> tags around answers from user input.
      //These will be used as dangerouslysetinnerhtml in the Essay component
      const fieldAnswers = state.fieldAnswers;
      const fieldOrder = state.fieldOrder;

      const essayRender = Object.keys(fieldAnswers)
        .map(key => {
          return [
            FIELD_NAMES[key],
            fieldAnswers[key].sentence,
            fieldAnswers[key].answer
          ];
        })
        //Sort to ensure order is maintained, even if user enters answer
        //out of order
        .sort((pairA, pairB) => {
          return fieldOrder.indexOf(pairA[0]) - fieldOrder.indexOf(pairB[0]);
        })
        .map(pair => {
          const [, sentence, answer] = pair;

          //Wrap <strong> tags around each answer
          let sentenceModified = sentence.replace(
            answer,
            `<strong>${
              //Check if answer is the first word in the sentence.
              //If it is, capitalize it.
              checkIfAnswerIsFirstWord(sentence, answer)
                ? capitalizeWord(answer)
                : answer
            }</strong>`
          );
          return sentenceModified;
        });

      return {
        ...state,
        essayRender: essayRender
      };
    }

    case SAVE_ESSAY: {
      return {
        ...state,
        essayText: action.payload
      };
    }

    case SUBMIT_FIELD: {
      const fieldAnswers = state.fieldAnswers;
      let fieldAnswersUpdate = {};
      const fieldName = action.payload.id;
      const answer = action.payload.answer;
      const sentence = action.payload.sentence;

      if (answer !== "") {
        //Add property immutably (if answer provided is NOT blank)
        const incomingAnswer = {
          [fieldName]: { answer, sentence }
        };
        fieldAnswersUpdate = Object.assign(fieldAnswers, incomingAnswer);
      } else {
        //Delete property immutably (if answer provided is blank)
        const { [fieldName]: fieldObj, ...remaining } = fieldAnswers;
        fieldAnswersUpdate = remaining;
      }

      return {
        ...state,
        fieldAnswers: fieldAnswersUpdate
      };
    }

    case TOGGLE_IS_EDITING: {
      //If clicking on "Start Over" (i.e. isEditing === true)
      //reset the essayText and fieldAnswers data to prevent
      //issues rendering if the essay text was edited.
      if (state.isEditing)
        return {
          ...INITIAL_STATE,
          fieldAnswers: {}
        };
      else
        return {
          ...state,
          isEditing: true
        };
    }

    default:
      return state;
  }
}

// Action creators
// ----------------------------------------------------------------------------
export function modifyEssay(id, answer, sentence) {
  return { type: MODIFY_ESSAY };
}

export function saveEssay(essay) {
  return { type: SAVE_ESSAY, payload: essay };
}

export function submitField({ id, answer, sentence }) {
  return dispatch => {
    //Creating promise to ensure modifyEssay action creator is dispatched
    //after fieldName has been updated. This is because the MODIFY_ESSAY action
    //requires data from the object and this will the data is in the object
    //prior to dispatching the action.
    const submitProm = new Promise((res, rej) => {
      dispatch({
        type: SUBMIT_FIELD,
        payload: { id, answer, sentence }
      });
      res();
    });

    submitProm.then(dispatch(modifyEssay()));
  };
}

export function toggleIsEditing() {
  return { type: TOGGLE_IS_EDITING };
}
