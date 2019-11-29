import React, { Component } from 'react'

import BookList from '../../components/BookList'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import Title from '../../components/Title'

import './style.scss'

class Library extends Component {
	constructor(props) {
		super(props)

		this.state = {
			books: [],
			filtered: false,
			filter: ''
		}

		this.setValue = this.setValue.bind(this)
		this.getBooks = this.getBooks.bind(this)
	}

	componentDidMount() {
		this.getBooks()
	}

	setValue(name, value) {
		this.setState({[name]: value})
	}

	getBooks = async() => {
		let books = localStorage.getItem('books'),
			items = books ? JSON.parse(books) : []

		if(items.length) {
			items.sort(function(a,b) {return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)})
		}

		this.setState({books: items})
	}

	handleSearch = async(event) => {
		event.preventDefault()

		let {
			books,
			filter
		} = this.state

		let result = books.filter(x => x.title.toLowerCase().indexOf(filter.toLowerCase()) > -1)

		this.setState({
			filtered: result
		})
	}

	clearSearch = async() => {
		this.setState({
			filtered: false,
			filter: ''
		})
	}

	render() {
		const {
			books,
			filter,
			filtered
		} = this.state

		return (
			<div className={'library page'}>
				<Header current={'library'} />

				<div className={'limit-grid'}>
					<Title text={'My Library'} />

					<BookList
						books={filtered || books}
						filter={filter}
						filtered={filtered}
						setValue={this.setValue}
						handleSearch={this.handleSearch}
						clearSearch={this.clearSearch}
					/>
				</div>
				
				<Navbar current={'library'} />
			</div>
		)
	}
}

export default Library