import React, { Component } from 'react'

import { connect } from 'react-redux'
import { Creators } from '../../store/ducks/book'

import InfiniteScroll from 'react-infinite-scroller'
import Spinner from 'react-svg-spinner'
import Swal from 'sweetalert2'

import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import Title from '../../components/Title'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Select from '../../components/Select'
import SearchList from '../../components/SearchList'
import findIcon from '../../assets/images/find.svg'

import './style.scss'

class Search extends Component {
	constructor(props) {
		super(props)

		this.state = {
			type: 'title',
			filter: '',
			placeholder: {title: 'Find books by name', author: 'Find books by author'},
			submited: false,
			searching: false
		}

		this.setValue = this.setValue.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
	}

	setValue(name, value) {
		this.setState({[name]: value})
	}

	handleAdd = async(book) => {
		this.props.onAddBook(book)
	}

	handleSearch = async(event) => {
		event.preventDefault()

		const {
			filter, 
			type
		} = this.state

		if(filter && filter.length > 3) {
			this.setState({
				submited: true
			})

			this.props.onLoadingSearchBooks(true);
			this.props.onCheckSearchSubmission(true);
			this.props.onSearchBook(type, filter, 1)
		} else {
			Swal.fire({
				title: 'Error!',
				text: 'Please enter your search to continue.',
				confirmButtonText: 'OK'
			})
		}
	}

	render() {
		const {
			type,
			filter,
			placeholder,
			submited
		} = this.state

		return (
			<div className={'search page'}>
				<Header current={'search'} />

				<div className={'limit-grid'}>
					<Title text={'Search Books'} />

					<form onSubmit={this.handleSearch}>
						<Input
							id={'filter'}
							name={'filter'}
							type={'text'}
							placeholder={placeholder[type]}
							value={filter}
							onChange={this.setValue}
							leftIcon={
								<Select
									id={'type'}
									name={'type'}
									selected={type}
									options={[
										{title: 'Filter by name', value: 'title'},
										{title: 'Filter by author', value: 'author'}
									]}
									containerStyle={{width: 'auto', padding: 0, marginRight: '10px', paddingRight: '10px', borderRight: '#949292 1px solid'}}
									onChange={this.setValue}
								/>
							}
							rightIcon={
								<Button
									title={
										<svg className={'search__button-icon'}>
											<use xlinkHref={`${findIcon}#find`} />
										</svg>
									}
									type={'submit'}
									containerStyle={{width: 'auto', padding: 0}}
									buttonStyle={{height: 'auto', background: 'none', WebkitBoxShadow: 'none', boxShadow: 'none'}}
								/>
							}
						/>
					</form>

					{submited &&
						<div>
							{!this.props.checkSearchSubmission ?
								<InfiniteScroll
									pageStart={1}
									loadMore={(page) => {
										this.props.onSearchBook(type, filter, page)
									}}
									hasMore={this.props.more}
									loader={
										<div className={'spinner-container'} key={0}>
											<Spinner
												size={'30'}
												color={'var(--blue)'}
												thickness={3}
												gap={3}
												speed={'fast'}
											/>
										</div>
									}
								>
									<SearchList books={this.props.books} total={this.props.total} handleAdd={this.handleAdd} />
								</InfiniteScroll>
								:
								<div className={'spinner-container'} key={0}>
									<Spinner
										size={'30'}
										color={'var(--blue)'}
										thickness={3}
										gap={3}
										speed={'fast'}
									/>
								</div>
							}
						</div>
					}
				</div>
				
				<Navbar current={'search'} />
			</div>
		)
	}
}

export default connect(
	state => ({
		book: state.book.book,
		books: state.book.books,
		loadingBook: state.book.loadingBook,
		loadingSearchBooks: state.book.loadingSearchBooks,
		loadingBooks: state.book.loadingBooks,
		total: state.book.total,
		more: state.book.more,
		page: state.book.page,
		qt: state.book.qt,
		checkSearchSubmission: state.book.checkSearchSubmission,
		error: state.book.error
	}),
	dispatch => ({
		onSearchBook: (type, filter, page) => {
			dispatch(Creators.searchBooks(type, filter, page))
		},
		onAddBook: (book) => {
			dispatch(Creators.addBook(book))
		},
		onLoadingSearchBooks: (state) => {
			dispatch(Creators.loadingSearchBooks(state))
		},
		onCheckSearchSubmission: (state) => {
			dispatch(Creators.checkSearchSubmission(state))
		}
	})
)(Search)