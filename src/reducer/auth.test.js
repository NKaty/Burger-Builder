import reducer from './auth'

import { AUTH, AUTH_LOGOUT, START, SUCCESS, FAIL } from '../constants'

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      loading: false,
      error: null
    })
  })

  it('should store the token upon login', () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          loading: false,
          error: null
        },
        {
          type: AUTH + SUCCESS,
          payload: { idToken: 'some-token', userId: 'some-id' }
        }
      )
    ).toEqual({
      token: 'some-token',
      userId: 'some-id',
      loading: false,
      error: null
    })
  })
})
