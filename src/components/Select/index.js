import React from 'react'

import './style.scss'

const Select = (props) => {
    const {
        id,
        name,
        label,
        options,
        selected,
        invalid,
        invalidMessage,
        containerStyle
    } = props

    const handleInputChange = (event) => {
        const target = event.target
        const value = target.value
        const name = target.name
        
        props.onChange(name, value)
    }

    return (
        <div
            className={'select-content' + (invalid === true ? ' select-content--invalid' : '')}
            style={containerStyle}
        >
            {label && 
                <label
                    className={'select-content__label'}
                    htmlFor={id}
                >
                    {label}
                </label>
            }
            <select
                className={'select-content__select'}
                id={id}
                name={name}
                value={selected}
                onChange={handleInputChange}
            >
                {options.map((option, index) =>
                    <option
                        key={index.toString()}
                        value={option.value}
                    >
                        {option.title}
                    </option>
                )}
            </select>
            {invalid &&
                <span className={'select-content__error-message'}>
                    {invalidMessage}
                </span>
            }
        </div>
    )
}

export default Select