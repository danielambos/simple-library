describe('Navigation', () => {
	beforeEach(() => {
		// log in before each test:
		cy.login()
	})

	it('Library link', () => {
		cy.get('a.header__menu__link').contains('My Library').click()
		cy.url().should('match', new RegExp('localhost:3000/library$'))
	})

	it('Search link', () => {
		cy.get('a.header__menu__link').contains('Search Books').click()
		cy.url().should('match', new RegExp('localhost:3000/search$'))
	})

	it('Report link', () => {
		cy.get('a.header__menu__link').contains('Annual Report').click()
		cy.url().should('match', new RegExp('localhost:3000/report$'))
	})
})