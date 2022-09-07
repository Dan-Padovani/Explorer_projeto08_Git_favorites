// Consulta user github
class GithubUser {
	static search(username) {
		
	}
}

// Construçao dos dados da aplicação
class Favorites {
	constructor(root) {
		this.root = document.querySelector(root)

		this.load()
	}

	load() {
		this.entries = [
			{
				login: 'maykbrito',
				name: 'Mayk Brito',
				public_repos: '76',
				followers: '80000'
			},
			{
				login: 'dan-padovani',
				name: 'Dan-Padovani',
				public_repos: '18',
				followers: '12'
			},
			{
				login: 'diego3g',
				name: 'Diego Fernandes',
				public_repos: '16',
				followers: '120000'
			}
		]
	}

	removeUser(user) {
		console.log('até aqui ok e o user é = ', user)
	}
}


// Construção do html da aplicação
export class FavoritesView extends Favorites {
	constructor(root) {
		super(root) 


		this.tbody = document.querySelector('table tbody')
		
		this.update()
		
	}

	update() {

		this.removeTableRows()
		

		this.entries.forEach(user => {
			const row = this.createRows()
			
			row.querySelector('.user img').src = `https://github.com/${user.login}.png`
			row.querySelector('.user img').alt = `Imagem de ${user.name}`
			row.querySelector('.user a').href = `https://github.com/${user.login}`
			row.querySelector('.user p').textContent = user.name
			row.querySelector('.user span').textContent = user.login
			row.querySelector('.repositories').textContent = user.public_repos
			row.querySelector('.followers').textContent = user.followers

			//delete current row
			row.querySelector('.remove').onclick = () => {
				const isItOk = confirm('Tem certeza que deseja deletar este usuario dos seus favoritos?')

				if(isItOk) {
					this.removeUser(user)
				}
			}

			this.tbody.append(row)
		});

	}

	createRows() {
		const tr = document.createElement('tr')

		tr.innerHTML = `
		<td class="user">
			<img src="https://github.com/Dan-Padovani.png" alt="imagem de Dan-Padovani">
			<a href="https://github.com/Dan-Padovani" target="_blank">
				<p>Daniel Padovani</p>
				<span>Dan-Padovani</span>
			</a>
		</td>
		<td class="repositories">
			28
		</td>
		<td class="followers">
			12
		</td>
		<td>
			<p class="remove">Remover</p>
		</td>
		`
		return tr
	}

	removeTableRows() {
		this.tbody.querySelectorAll('tr')
		.forEach(tr => {
			tr.remove()
		});
	}
}
