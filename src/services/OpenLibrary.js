export default class OpenLibraryApi {
	async get(olid) {
		try {
			let request = await fetch(`https://openlibrary.org/api/books?bibkeys=OLID:${olid}&jscmd=data&format=json`, {
				method: 'GET'
			})

			return await request.json()
		} catch (error) {
			return error
		}
	}

	async details(olid) {
		try {
			let request = await fetch(`https://openlibrary.org/api/books?bibkeys=OLID:${olid}&jscmd=details&format=json`, {
				method: 'GET'
			})

			return await request.json()
		} catch (error) {
			return error
		}
	}

	async search(type, text, page) {
		try {
			let request = await fetch(`http://openlibrary.org/search.json?${type}=${text}&page=${page}`, {
				method: 'GET'
			})

			return await request.json()
		} catch (error) {
			return error
		}
	}
}