import { configureStore } from '@reduxjs/toolkit'
import rootReducer from "./reducers";

export default configureStore({
  reducer: rootReducer,
})

export const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}
