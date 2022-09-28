import { createSlice } from '@reduxjs/toolkit'

export const clockSlice = createSlice({
  name: 'clock',
  initialState: {
    activity: 'session',
    elapse: false
  },
  reducers: {
    toggleActivity: state => {
      state.activity = state.activity === 'session' ? 'break' : 'session'
    },
    toggleElapse: state => {
        state.elapse = !state.elapse
    }
  }
})

export const { toggleActivity, toggleElapse } = clockSlice.actions

export default clockSlice.reducer