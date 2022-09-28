import { createSlice } from '@reduxjs/toolkit'

export const sessionCustomizerSlice = createSlice({
  name: 'sessionCustomizer',
  initialState: {
    value: 25,
  },
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      if (state.value > 0) {
        state.value -= 1
      }
    },
    resetSession: state => {
      state.value = 25
    }
  }
})

export const { increment, decrement, resetSession } = sessionCustomizerSlice.actions

export default sessionCustomizerSlice.reducer