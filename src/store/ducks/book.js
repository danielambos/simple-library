import Api from '../../services/Api'
import Swal from 'sweetalert2'
import { createActions, createReducer } from 'reduxsauce'

export const { Types, Creators } = createActions({
	addBook: (book) => async dispatch => {
		try {
			let books = localStorage.getItem('books'),
			items = books ? JSON.parse(books) : []

			if(items.length) {
				let index = items.findIndex(x => x.id === book.id)

				if(index > -1) {
					Swal.fire({
						title: 'Error!',
						text: 'You already added this Book.',
						confirmButtonText: 'OK'
					})
				}
			} else {
				items.push(book)

				localStorage.setItem('books', JSON.stringify(items))

				Swal.fire({
					title: 'Success!',
					text: 'You successfully added the book.',
					confirmButtonText: 'OK'
				})
			}
		} catch (error) {
			Swal.fire({
				title: 'Error!',
				text: 'Sorry, an unexpected error has occurred!',
				confirmButtonText: 'OK'
			})
		}

		return {
			type: 'ADD_BOOK',
		}
	},
	loadBook: (id) => async dispatch => {
		try {
			dispatch(Creators.loadingBook(true))

			let data = await Api.OpenLibrary.get(id),
				details = await Api.OpenLibrary.details(id),
				response = data[`OLID:${id}`]

			let books = localStorage.getItem('books'),
				items = books ? JSON.parse(books) : [],
				book = items.find(x => x.id === id),
				index = items.findIndex(x => x.id === book.id)

			response.id = id;
			response.index = index
			response.read = book ? book.read : false
			response.details = details[`OLID:${id}`].details

			if ( Object.keys(response).length !== 0) {
				dispatch(Creators.loadBookSuccess(response))
				dispatch(Creators.loadingBook(false))
			} else {
				dispatch(Creators.loadBookFailure(response.message ? response.message : "Sorry, an unexpected error has occurred!"))
				dispatch(Creators.loadingBook(false))
			}
		} catch (error) {
			dispatch(Creators.loadBookFailure("Sorry, an unexpected error has occurred!"))
		}

		return {
			type: 'LOAD_BOOK',
		}
	},
	loadBookSuccess: ['book'],
	loadBookFailure: ['error'],
	loadingBook: ['active'],
	markAsRead: () => async (dispatch, getState) => {
		let book = getState().book.book

		try {
			book.read = true;

			let books = JSON.parse(localStorage.getItem('books'))			

			books[book.index] = book

			localStorage.setItem('books', JSON.stringify(books))
		} catch (error) {
			dispatch(Creators.loadBookFailure("Sorry, an unexpected error has occurred!"))
		}

		return {
			type: 'MARK_AS_READ',
			book: book
		}
	},
	searchBooks: (type, filter, page, qt) => async (dispatch, getState) => {
		try {
			let response = await Api.OpenLibrary.search(type, filter, page)
			response.page = page;

			let currentQt = getState().book.qt;

			if(qt && currentQt !== qt) {
				dispatch(Creators.changeQuantityPerPage(qt))
			}

			if ( Object.keys(response).length !== 0) {
				dispatch(Creators.searchBooksSuccess(response))
				dispatch(Creators.loadingSearchBooks(false))
				dispatch(Creators.checkSearchSubmission(false))
			} else {
				dispatch(Creators.searchBooksFailure(response.message ? response.message : "Sorry, an unexpected error has occurred!"))
				dispatch(Creators.loadingSearchBooks(false))
			}
		} catch (error) {
			dispatch(Creators.searchBooksFailure("Sorry, an unexpected error has occurred!"))
		}

		return {
			type: 'SEARCH_BOOK'
		}
	},
	searchBooksSuccess: ['books'],
	searchBooksFailure: ['error'],
	loadingSearchBooks: (state) => (dispatch) => {
        dispatch({ type: 'LOADING_SEARCH_BOOKS', active: state });
    },
	changeQuantityPerPage: ['qt'],
	checkSearchSubmission: (state) => (dispatch) => {
        dispatch({ type: 'CHECK_SEARCH_SUBMISSION', active: state });
    }
})

const INITIAL_STATE = {
	book: null,
	books: [],
	loadingBook: false,
	loadingSearchBooks: false,
	loadingBooks: false,
	total: 0,
	more: false,
	page: 0,
	qt: 100,
	checkSearchSubmission: false,
	error: null
}

const addBook = (state = INITIAL_STATE, action) => {
	return INITIAL_STATE
}

const loadBook = (state = INITIAL_STATE, action) => {
	return INITIAL_STATE
}

const loadBookSuccess = (state = INITIAL_STATE, action) => {
	return {
		...state,
		book: action.book
	}
}

const loadBookError = (state = INITIAL_STATE, action) => {
	return {
		...state,
		error: action.error
	}
}

const loadingBook = (state = INITIAL_STATE, action) => {
	return {
		...state,
		loadingBook: action.active
	}
}

const markAsRead = (state = INITIAL_STATE, action) => {
	return {
		...state,
		book: action.book
	}
}

const searchBooks = (state = INITIAL_STATE, action) => {
	return INITIAL_STATE
}

const searchBooksSuccess = (state = INITIAL_STATE, action) => {
	return {
		...state,
		books: state.checkSearchSubmission ? [...action.books.docs] : [...state.books, ...action.books.docs],
		total: action.books.numFound,
		page: action.books.page,
		more: action.books.numFound > action.books.page * state.qt
	}
}

const searchBookError = (state = INITIAL_STATE, action) => {
	return {
		...state,
		error: action.error
	}
}

const loadingSearchBooks = (state = INITIAL_STATE, action) => {
	return {
		...state,
		loadingSearchBooks: action.active
	}
}

const changeQuantityPerPage = (state = INITIAL_STATE, action) => {
	return {
		...state,
		qt: action.qt
	}
}

const checkSearchSubmission = (state = INITIAL_STATE, action) => {
	return {
		...state,
		checkSearchSubmission: action.active,
	}
}

export default createReducer(INITIAL_STATE, {
	[Types.ADD_BOOK]: addBook,
	[Types.LOAD_BOOK]: loadBook,
	[Types.LOAD_BOOK_SUCCESS]: loadBookSuccess,
	[Types.LOAD_BOOK_FAILURE]: loadBookError,
	[Types.LOADING_BOOK]: loadingBook,
	[Types.MARK_AS_READ]: markAsRead,
	[Types.SEARCH_BOOKS]: searchBooks,
	[Types.SEARCH_BOOKS_SUCCESS]: searchBooksSuccess,
	[Types.SEARCH_BOOKS_FAILURE]: searchBookError,
	[Types.LOADING_SEARCH_BOOKS]: loadingSearchBooks,
	[Types.CHANGE_QUANTITY_PER_PAGE]: changeQuantityPerPage,
	[Types.CHECK_SEARCH_SUBMISSION]: checkSearchSubmission
})