describe('Search', () => {
	beforeEach(() => {
		cy.books()
		cy.login()
		cy.visit('localhost:3000/library')
	});

	it('should get a list of books and add book as readed', () => {
		// should return 4 items
		cy.get('.book-list').find('li').should('have.length', 4)
		// should open first book
		cy.get('.book-list-item:first-child').find('a').click()
		// should change url
		cy.url().should('match', new RegExp('localhost:3000/book/OL26757374M$'))
		// should return button "mark as read"
		cy.get('.details').find('button').contains('Mark as read')
		// should open date field
		cy.get('.details').find('button').contains('Mark as read').click()
		// should return success
		cy.get('.swal2-container').find('.swal2-confirm').should('have.length', 1)
		// should click ok and return to list
		cy.get('.swal2-container').find('.swal2-confirm').click()
		// should return as readed
		cy.get('.details').find('.details__readed').contains('You already marked as read this book')
	})
})