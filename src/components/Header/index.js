import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

import logo from '../../assets/images/logo.svg'

class Header extends Component {
	render() {
		const {
			current,
			back
		} = this.props

		return (
			<div className={'header'}>
				<Link to={'/library'} className={'header__logo'}>
					<svg className={'header__logo__icon'}>
						<use xlinkHref={`${logo}#logo`} />
					</svg>
					<h1 className={'header__logo__title'}>Simple Library</h1>
				</Link>
				{back ?
					<ul className={'header__menu header__menu--return'}>
						<li>
							<Link to={back} className={'header__menu__link'}>Return</Link>
						</li>
					</ul>
					:
					<ul className={'header__menu'}>
						<li>
							<Link to={'/library'} className={'header__menu__link ' + (current === 'library' && 'header__menu__link--selected')}>My Library</Link>
						</li>
						<li>
							<Link to={'/search'} className={'header__menu__link ' + (current === 'search' && 'header__menu__link--selected')}>Search Books</Link>
						</li>
						<li>
							<Link to={'/report'} className={'header__menu__link ' + (current === 'report' && 'header__menu__link--selected')}>Annual Report</Link>
						</li>
					</ul>
				}
			</div>
		)
	}
}

export default Header