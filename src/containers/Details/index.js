import React, { Component } from 'react'

import { connect } from 'react-redux'
import { Creators } from '../../store/ducks/book'

import Swal from 'sweetalert2'

import Button from '../../components/Button'
import Header from '../../components/Header'
import Title from '../../components/Title'

import image from '../../assets/images/image.jpg'
import './style.scss'

class Details extends Component {
	constructor(props) {
		super(props)

		this.state = {
			id: this.props.match.params.bookId
		}

		this.handleRead = this.handleRead.bind(this)
		this.handleReport = this.handleReport.bind(this)
	}

	componentDidMount() {
		const {
			id
		} = this.state

		this.props.onLoadBook(id)
	}

	handleRead = async() => {
		let today = new Date().toISOString().slice(0,10)

		let date = await Swal.fire({
			title: 'Enter the date that you read the book',
			html: `<input id="readDate" value="${today}" type="date" style="margin: 20px 0; padding: 10px; border: #949292 1px solid; color: 949292;" />`,
			showCancelButton: true,
		    onOpen: function () {
			    document.getElementById('readDate').focus()
			},
			preConfirm: function () {
				let value = document.getElementById('readDate').value

				return value || false
			}
		})

		if('value' in date) {
			this.props.onMarkAsRead()
			this.handleReport(date.value)

			Swal.fire({
				title: 'Success!',
				text: 'You successfully marked as read this book.',
				confirmButtonText: 'OK'
			})
		}
	}

	handleReport = async(date) => {
		this.props.onSaveBookToReport(date)
	}

	render() {
		return (
			<div className={'details'}>
				<Header back={'/library'} />

				{this.props.book &&
					<div className={'limit-grid'}>
						<Title text={this.props.book.title} />

						<div className={'details__container'}>
							<div className={'details__left'}>
								<img className={'details__image'} src={this.props.book.cover.medium || image} alt={this.props.book.title} />
								{this.props.read ?
									<p className={'details__readed'}>You already marked as read this book</p>
									:
									<Button
										title={'Mark as read'}
										type={'Button'}
										styleType={'small'}
										buttonStyle={{width: '100%'}}
										onClick={this.handleRead}
									/>
								}
								
							</div>
							<div className={'details__right'}>
								{'authors' in this.props.book &&
									<p>
										by 
										{this.props.book.authors.length && this.props.book.authors.map((author, index) =>
											<b key={index}>{index > 0 ? `, ${author.name}` : ` ${author.name}`}</b>
										)}
									</p>
								}
								<p>
									Published <b>{'publish_date' in this.props.book ? this.props.book.publish_date : ''}</b>
									{'publishers' in this.props.book &&
										<span>
											{' by'} 
											{this.props.book.publishers.length && this.props.book.publishers.map((publisher, index) =>
												<i key={index}>{index > 0 ? `, ${publisher.name}` : ` ${publisher.name}`}</i>
											)}
										</span>
									}
									{'publish_places' in this.props.book &&
										<span> 
											{' in'} 
											{this.props.book.publish_places.length && this.props.book.publish_places.map((places, index) =>
												<i key={index}>{index > 0 ? `, ${places.name}` : ` ${places.name}`}</i>
											)}
										</span>
									}
									.
								</p>
								{'subjects' in this.props.book &&
									<p>
										<br/>
										{'Subjects:'}
										<br/>
										{this.props.book.subjects.length && this.props.book.subjects.map((subject, index) =>
											<i key={index}>{index > 0 ? `, ${subject.name}` : ` ${subject.name}`}</i>
										)}
										.
									</p>
								}
								{'subject_people' in this.props.book &&
									<p>
										<br/>
										{'People:'}
										<br/>
										{this.props.book.subject_people.length && this.props.book.subject_people.map((people, index) =>
											<i key={index}>{index > 0 ? `, ${people.name}` : ` ${people.name}`}</i>
										)}
										.
									</p>
								}
								{'subject_places' in this.props.book &&
									<p>
										<br/>
										{'Places:'}
										<br/>
										{this.props.book.subject_places.length && this.props.book.subject_places.map((places, index) =>
											<i key={index}>{index > 0 ? `, ${places.name}` : ` ${places.name}`}</i>
										)}
										.
									</p>
								}
								{'description' in this.props.book.details &&
									<p>
										<br/>
										<br/>
										<b>{'About the Book:'}</b>
										<br/>
										{typeof this.props.book.details.description === 'object' ? this.props.book.details.description.value : this.props.book.details.description}
									</p>
								}
							</div>
						</div>
					</div>
				}
			</div>
		)
	}
}

export default connect(
    state => ({
		book: state.book.book,
		read: state.book.read
    }),
    dispatch => ({
        onLoadBook: (id) => {
			dispatch(Creators.loadBook(id))
		},
		onMarkAsRead: () => {
			dispatch(Creators.markAsRead())
		},
		onSaveBookToReport: (date) => {
			dispatch(Creators.saveBookToReport(date))
		}
    })
)(Details)