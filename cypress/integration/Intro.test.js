/* globals cy */

describe('Intro', () => {
	beforeEach(() => {
		cy.visit('localhost:3001')
	});

	it('should enter Name and submit form', () => {
		// fill name input
		cy.get('input[name="name"]').type('Test{enter}')
		// shoul redirect to library page
		cy.url().should('match', new RegExp('localhost:3001/library$'))
	})
})