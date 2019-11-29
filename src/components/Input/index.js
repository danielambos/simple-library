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
            name,
            type,
            placeholder,
            value,
            leftIcon,
            rightIcon,
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
                <div className={'input-content__wrapper'}>
                    {leftIcon &&
                        leftIcon
                    }
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
                    {rightIcon &&
                        rightIcon
                    }
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