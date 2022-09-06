// Consulta user github
class GithubUser {
	static search(username) {
		
	}
}

// Construçao dos dados da aplicação
class Favorites {
	constructor(root) {
		this.root = document.querySelector(root)
	}
}


// Contrução do html da aplicação
export class FavoritesView extends Favorites {
	constructor(root) {
		super(root) 

		//console.log(this.root)
		this.tbody = document.querySelector('table tbody')
		console.log(this.tbody)
	}
}
