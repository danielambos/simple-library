import React, { Component } from 'react'

import './style.scss'

class Input extends Component {
    constructor(props) {
        super(props)

        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(event) {
        const {
            value = event.target.value,
            name = event.target.name
        } = event
        
        this.props.onChange(name, value)
	}

    render() {
        const {
            id,
            label,
            name,
            type,
            placeholder,
            value,
            invalid,
            invalidMessage,
            containerStyle
        } = this.props

        const required = this.props.required ? {'required': true} : null

        return (
            <div
                className={'input-content' + (invalid === true ? ' input-content--invalid' : '')}
                style={containerStyle}
            >
                {label && 
                    <label
                        className={'input-content__label'}
                        htmlFor={id}
                    >
                        {label}
                    </label>
                }
                <div className={'input-content__wrapper'}>
                    <input
                        className={'input-content__input'}
                        id={id}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={this.handleInputChange}
                        {...required}
                    />
                </div>
                {invalid &&
                    <span className={'input-content__error-message'}>
                        {invalidMessage}
                    </span>
                }
            </div>
        )
    }
}

export default Input