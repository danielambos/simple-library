import { createActions, createReducer } from 'reduxsauce'

export const { Types, Creators } = createActions({
	registerUser: (data) => dispatch => {
		try {
			dispatch(Creators.loadingRegisterUser(true))

			localStorage.setItem('user', JSON.stringify(data))

			dispatch(Creators.registerUserSuccess(data))
			dispatch(Creators.loadingRegisterUser(false))
		} catch (error) {
			dispatch(Creators.loadUserFailure(`Something went wrong: ${error}`))
			dispatch(Creators.loadingRegisterUser(false))
		}

		return {
			type: 'REGISTER_USER'
		}
	},
	registerUserSuccess: ['user'],
	registerUserFailure: ['error'],
	loadingRegisterUser: ['active'],
	loadUser: () => async dispatch => {
		try {
			dispatch(Creators.loadingUser(true))

			const user = localStorage.getItem('user')

			dispatch(Creators.loadUserSuccess(JSON.parse(user)))
			dispatch(Creators.loadingUser(false))
		} catch (error) {
			dispatch(Creators.loadUserFailure(`Something went wrong: ${error}`))
			dispatch(Creators.loadingUser(false))
		}

		return {
			type: 'LOAD_USER'
		}
	},
	loadUserSuccess: ['user'],
	loadUserFailure: ['error'],
	loadingUser: ['active']
})

const INITIAL_STATE = {
	user: {
		name: null
	},
	loadingRegisterUser: false,
	loadingUser: false,
	error: null
}

const registerUser = (state = INITIAL_STATE, action) => {
	return INITIAL_STATE
}

const registerUserSuccess = (state = INITIAL_STATE, action) => {
	return {
		...state,
		user: action.user
	}
}

const registerUserFailure = (state = INITIAL_STATE, action) => {
	return {
		...state,
		error: action.error
	}
}

const loadingRegisterUser = (state = INITIAL_STATE, action) => {
	return {
		...state,
		loadingRegisterUser: action.active
	}
}

const loadUser = (state = INITIAL_STATE, action) => {
	return INITIAL_STATE
}

const loadUserSuccess = (state = INITIAL_STATE, action) => {
	return {
		...state,
		user: action.user
	}
}

const loadUserError = (state = INITIAL_STATE, action) => {
	return {
		...state,
		error: action.error
	}
}

const loadingUser = (state = INITIAL_STATE, action) => {
	return {
		...state,
		loadingUser: action.active
	}
}

export default createReducer(INITIAL_STATE, {
	[Types.REGISTER_USER]: registerUser,
	[Types.REGISTER_USER_SUCCESS]: registerUserSuccess,
	[Types.REGISTER_USER_FAILURE]: registerUserFailure,
	[Types.LOADING_REGISTER_USER]: loadingRegisterUser,
	[Types.LOAD_USER]: loadUser,
	[Types.LOAD_USER_SUCCESS]: loadUserSuccess,
	[Types.LOAD_USER_FAILURE]: loadUserError,
	[Types.LOADING_USER]: loadingUser
})