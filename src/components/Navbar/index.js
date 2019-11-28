import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

import library from '../../assets/images/library.svg'
import search from '../../assets/images/search.svg'
import calendar from '../../assets/images/calendar.svg'

class Navbar extends Component {
	render() {
		let current = this.props.current

		return (
			<div className={'navbar'}>
				<Link to={'/library'} className={'navbar__link ' + (current === 'library' && 'navbar__link--selected')}>
					<span className={'navbar__link__icon'}>
						<svg className={'navbar__link__svg'}>
							<use xlinkHref={`${library}#library`} />
						</svg>
					</span>
					<span className={'navbar__link__text'}>My Library</span>
				</Link>

				<Link to={'/search'} className={'navbar__link ' + (current === 'search' && 'navbar__link--selected')}>
					<span className={'navbar__link__icon'}>
						<svg className={'navbar__link__svg'}>
							<use xlinkHref={`${search}#search`} />
						</svg>
					</span>
					<span className={'navbar__link__text'}>Search Books</span>
				</Link>

				<Link to={'/report'} className={'navbar__link ' + (current === 'report' && 'navbar__link--selected')}>
					<span className={'navbar__link__icon'}>
						<svg className={'navbar__link__svg'}>
							<use xlinkHref={`${calendar}#calendar`} />
						</svg>
					</span>
					<span className={'navbar__link__text'}>Annual Report</span>
				</Link>
			</div>
		)
	}
}

export default Navbar