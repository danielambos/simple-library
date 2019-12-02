Cypress.Commands.add('books', () => {
	localStorage.setItem('books', JSON.stringify([{"id":"OL1532643M","cover":8314541,"title":"The Lord of the Rings","read":false},{"id":"OL26757374M","cover":8406761,"title":"Hobbit","read":false},{"id":"OL26446260M","cover":8167232,"title":"Two Towers","read":false},{"id":"OL3940674M","cover":7908450,"title":"The Silmarillion","read":false}]))
})