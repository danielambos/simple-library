import React from 'react'
import Spinner from 'react-svg-spinner'

import './style.scss'

const Button = (props) => {
    const {
        type,
        onClick,
        title,
        loading,
        styleType,
        disabled,
        containerStyle,
        buttonStyle
    } = props

    return (
        <div
            className={'button-content'}
            style={containerStyle}
        >
            <button
                className={'button-content__button button-content__button--primary ' + (styleType === 'light' && 'button-content__button--light')}
                style={buttonStyle}
                type={type}
                onClick={onClick}
                disabled={loading || disabled}
            >
                { loading ?
                    <Spinner
                        size={'20'}
                        color={'var(--white)'}
                        thickness={3}
                        gap={3}
                        speed={'fast'}
                    />
                    :
                    title
                }
            </button>
        </div>
    )
}

export default Button