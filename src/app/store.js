import { configureStore } from '@reduxjs/toolkit';
import breakCustomizerReducer from '../features/breakCustomizer/breakCustomizerSlice'
import sessionCustomizerReducer from '../features/sessionCustomizer/sessionCustomizerSlice'
import clockReducer from '../features/clock/clockSlice'

export default configureStore({
  reducer: {
    breakCustomizer: breakCustomizerReducer,
    sessionCustomizer: sessionCustomizerReducer,
    clock: clockReducer
  }
})

