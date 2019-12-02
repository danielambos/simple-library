describe('Search', () => {
	beforeEach(() => {
		cy.report()
		cy.login()
		cy.visit('localhost:3000/report')
	});

	it('should get total of redead books in 2019', () => {
		// select filter by author
		cy.get('.select-content__select').select('2019')
		// should contains 2 books
		cy.get('.report-list__year').find('b').contains('2')
	})
})