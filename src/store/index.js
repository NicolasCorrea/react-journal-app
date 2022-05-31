import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { authReducer } from '../reducers/authReducer'
import { notesReducer } from '../reducers/notesReducer'
import { uiReducer } from '../reducers/uiReducer'

export default configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
  }
}, [thunk])

// import { configureStore } from '@reduxjs/toolkit'
// import { combineReducers, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import { authReducer } from '../reducers/authReducer'

// const reducer = combineReducers({
//   auth: authReducer
// })

// const middlewareEnhancer = applyMiddleware(thunk)

// export default configureStore({
//   reducer,
//   undefined,
//   middlewareEnhancer
// })
