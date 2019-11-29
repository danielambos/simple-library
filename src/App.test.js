import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import Button from './components/Button'
import Input from './components/Input'
import Header from './components/Header'
import Navbar from './components/Navbar'

it('test Button component', () => {
	const div = document.createElement('div')
	ReactDOM.render(<Button title={'test'} type={'submit'} />, div)
	ReactDOM.unmountComponentAtNode(div)
})

it('test Input component', () => {
	const div = document.createElement('div')
	const defaultValue = 'test'
	ReactDOM.render(<Input value={defaultValue} />, div)
	expect(div.querySelector('input').value).toBe(
		defaultValue
	)
	ReactDOM.unmountComponentAtNode(div)
})

it('test Header component', () => {
	const div = document.createElement('div')
	ReactDOM.render(<Router><Header /></Router>, div)
	ReactDOM.unmountComponentAtNode(div)
})

it('test Navbar component', () => {
	const div = document.createElement('div')
	ReactDOM.render(<Router><Navbar /></Router>, div)
	ReactDOM.unmountComponentAtNode(div)
})

it('renders App without crashing', () => {
	const div = document.createElement('div')
	ReactDOM.render(<App />, div)
	ReactDOM.unmountComponentAtNode(div)
})
