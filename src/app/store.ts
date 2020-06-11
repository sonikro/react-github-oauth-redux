import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../features/authentication/authenticationSlice';
import repositoriesReducer from "../features/repositories/repositorySlice"
const token = sessionStorage.getItem("token")

export default configureStore({
  reducer: {
    authentication: authenticationReducer,
    repositories: repositoriesReducer
  },
  preloadedState: {
      authentication: {
          token: token ? token : "",
          authenticated: token ? true : false,
      }
  }
});
