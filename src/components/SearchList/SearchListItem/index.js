import React from 'react'

import Button from '../../../components/Button'
import image from '../../../assets/images/image.jpg'
import './style.scss'

const SearchListItem = (props) => {
	const {
		book,
		handleAdd
	} = props

	return (
		<li className={'search-list-item'} data-id={book.cover_edition_key}>
			<div className={'search-list-item__left'}>
				<img className={'search-list-item__image'} src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : image} alt={book.title} />
			</div>
			<div className={'search-list-item__right'}>
				{book.title &&
					<p><b>{book.title}</b></p>
				}
				{book.author_name &&
					<p>
						Authors: 
						{book.author_name.map((name, index) =>
							<span key={index}>{index > 0 ? `, ${name}` : ` ${name}`}</span>
						)}
					</p>
				}
				{book.first_publish_year &&
					<p>First publication: {book.first_publish_year}</p>
				}
				{book.language &&
					<p>
						Languages: 
						{book.language.map((lang, index) =>
							<span key={index}>{index > 0 ? `, ${lang}` : ` ${lang}`}</span>
						)}
					</p>
				}
				<br/>
				<Button
					title={'Add to my library'}
					type={'Button'}
					styleType={'small'}
					onClick={() => handleAdd({id: book.cover_edition_key, cover: book.cover_i, title: book.title, read: false})}
				/>
			</div>
		</li>
	)
}

export default SearchListItem