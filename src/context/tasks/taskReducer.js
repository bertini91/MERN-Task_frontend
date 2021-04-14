import {
  TASKS_PROJECT,
  POST_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  ACTUAL_TASK,
  PUT_TASK,
  CLEAN_TASK,
} from "../../types/index";

export default (state, action) => {
  switch (action.type) {
    case TASKS_PROJECT:
      return {
        ...state,
        tasksProject: action.payload,
      };
    case POST_TASK:
      return {
        ...state,
        tasksProject: [action.payload, ...state.tasksProject],
        errorTask: false,
      };
    case VALIDATE_TASK:
      return {
        ...state,
        errorTask: true,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasksProject: state.tasksProject.filter((task) => task._id !== action.payload),
      };
    case PUT_TASK:
      return {
        ...state,
        tasksProject: state.tasksProject.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case ACTUAL_TASK:
      return {
        ...state,
        selectedTask: action.payload,
      };
    case CLEAN_TASK:
      return {
        ...state,
        selectedTask: null,
      };

    default:
      return state;
  }
};
