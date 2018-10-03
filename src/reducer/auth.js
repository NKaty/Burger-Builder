import {
  AUTH,
  AUTH_LOGOUT,
  START,
  SUCCESS,
  FAIL
} from '../constants'

const initialStateAuth = {
  token: null,
  userId: null,
  loading: false,
  error: null
}

export default (authState = initialStateAuth, action) => {
  const { type, payload } = action

  switch (type) {
    case AUTH + START:
      return {
        ...authState,
        loading: true,
        error: null
      }

    case AUTH + SUCCESS:
      return {
        ...authState,
        token: payload.idToken,
        userId: payload.userId,
        loading: false
      }

    case AUTH + FAIL:
      return {
        ...authState,
        loading: false,
        error: payload.error
      }

    case AUTH_LOGOUT:
      return {
        ...authState,
        token: null,
        userId: null
      }

    default:
      return authState
  }
}
