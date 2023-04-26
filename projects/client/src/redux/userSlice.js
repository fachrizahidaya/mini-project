import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: {
        username: '',
        email: '',
        phone: '',
        imgProfile: ''
    }
  },
  reducers: {
    setAuth: (initialState, action) => {
        initialState.value.username = action.payload.username
        initialState.value.email = action.payload.email
        initialState.value.phone = action.payload.phone
        initialState.value.imgProfile = action.payload.imgProfile
    }
  }
})

export const { setAuth } = userSlice.actions
export default userSlice.reducer