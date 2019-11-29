import React from 'react'
import { Link } from 'react-router-dom'

import BookListItem from './BookListItem'
import Button from '../../components/Button'
import Input from '../../components/Input'

import findIcon from '../../assets/images/find.svg'
import removeIcon from '../../assets/images/remove.svg'
import './style.scss'

const BookList = (props) => {
	const {
		books,
		filter,
		filtered,
		handleSearch,
		setValue,
		clearSearch
	} = props

	return (
		<div className={'book-list'}>
			{(books.length || filtered) ?
				<form onSubmit={handleSearch}>
					<Input
						id={'filter'}
						name={'filter'}
						type={'text'}
						placeholder={'Filter your books'}
						value={filter}
						onChange={setValue}
						leftIcon={filtered &&
							<Button
								title={
									<svg className={'search__button-icon'}>
										<use xlinkHref={`${removeIcon}#remove`} />
									</svg>
								}
								type={'button'}
								onClick={clearSearch}
								containerStyle={{width: 'auto', padding: 0, marginRight: '1rem'}}
								buttonStyle={{height: 'auto', background: 'none', WebkitBoxShadow: 'none', boxShadow: 'none'}}
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
				:
				<div className={'book-list__empty'}>
					<p className={'book-list__empty__text'}>You haven't added any books to your library, click the button below to search and add books.</p>
					<Link to={'/search'}>
						<Button
							title={'Search Books'}
							type={'button'}
							styleType={'small'}
						/>
					</Link>
				</div>
			}
			{filtered ?
				<div>
					{filtered.length ?
						<ul>
							{filtered.map((book, index) =>
								<BookListItem book={book} key={index} />
							)}
						</ul>
						:
						<p className={'book-list__empty__text'}>Your search didn't match any book</p>
					}
				</div>
				:
				<ul>
					{books.map((book, index) =>
						<BookListItem book={book} key={index} />
					)}
				</ul>
			}
		</div>
	)
}

export default BookList