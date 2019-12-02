describe('Search', () => {
	beforeEach(() => {
		cy.login()
		cy.visit('localhost:3000/search')
	});

	it('should get a list of books by name and add to library', () => {
		// fill filter input
		cy.get('input[name="filter"]').type('lord of the rings{enter}')
		// should return 100 items
		cy.get('.search-list').find('li').should('have.length', 100)
		// should add first to library
		cy.get('.search-list-item:first-child').find('button').click()
		// should return success
		cy.get('.swal2-container').find('.swal2-confirm').should('have.length', 1)
		// should click ok and return to list
		cy.get('.swal2-container').find('.swal2-confirm').click()
		// should navigate to library url
		cy.visit('localhost:3000/library')
		// should return 1 book
		cy.get('.book-list').find('li').should('have.length', 1)
	})

	it('should get a list of books by author and add to library', () => {
		// select filter by author
		cy.get('.select-content__select').select('author')
		// fill filter input
		cy.get('input[name="filter"]').type('j.r.r. tolkien{enter}')
		// should return 100 items
		cy.get('.search-list').find('li').should('have.length', 100)
		// should add first to library
		cy.get('.search-list-item:first-child').find('button').click()
		// should return success
		cy.get('.swal2-container').find('.swal2-confirm').should('have.length', 1)
		// should click ok and return to list
		cy.get('.swal2-container').find('.swal2-confirm').click()
		// should navigate to library url
		cy.visit('localhost:3000/library')
		// should return 1 book
		cy.get('.book-list').find('li').should('have.length', 1)
	})
})