import { createSlice } from '@reduxjs/toolkit'

// Whenever we request data from the server, we want to show a loader to the user and hide it when the data is received.
export const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    loading: false
  },
  reducers: {
    ShowLoader: (state, action) => {
      state.loading = action.payload
    }
  }
})

export const { ShowLoader } = loaderSlice.actions
