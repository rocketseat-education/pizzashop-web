import { getManagedRestaurantMock } from './get-managed-restaurant-mock'
import { getProfileMock } from './get-profile-mock'
import { registerRestaurantMock } from './register-restaurant-mock'
import { signInMock } from './sign-in-mock'
import { updateProfileMock } from './update-profile-mock'

export const handlers = [
  signInMock,
  registerRestaurantMock,
  getProfileMock,
  getManagedRestaurantMock,
  updateProfileMock,
]
