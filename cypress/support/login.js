Cypress.Commands.add('login', () => {
	localStorage.setItem('user', JSON.stringify({"name": "Test"}))

	cy.visit('localhost:3001/library')
})