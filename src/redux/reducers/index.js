import { combineReducers } from "@reduxjs/toolkit";
import JudgeReducer from "./JudgeReducer";
import JudgeTokenReducer from "./JudgeTokenReducer";
import SubmissionReducer from "./SubmissionReducer";

const reducers = combineReducers({
  JudgeReducer,
  JudgeTokenReducer,
  SubmissionReducer,
});

export default reducers;
