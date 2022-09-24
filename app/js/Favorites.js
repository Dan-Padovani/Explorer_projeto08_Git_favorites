import { GithubUser } from "./GithubUser.js"

// Building data aplication
class Favorites {
	constructor(root) {
		this.root = document.querySelector(root)
		this.load()
	}
	
	async add(username) {
		try {
			const userExistis = this.entries.find(entry => entry.login === username)

			if(userExistis) {
				throw new Error('Usuário já está na lista')
			}
			const user = await GithubUser.search(username)

			if(user.login === undefined) {
				throw new Error('Usuário não encontrado')
			}
			
			this.entries = [user, ...this.entries]
			this.update()
			this.save()

		} catch(error) {
			alert(error.message)
		}
	}

	load() {
		this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
		
	}

	save() {
		localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
	}

	delete(user) {

		const filteredUsers = this.entries
		.filter(entry => entry.login !== user.login)
		
		this.entries = filteredUsers
		this.update()
		this.save()
	}
}


// Html Constructor
export class FavoritesView extends Favorites {
	constructor(root) {
		super(root) 
		this.tbody = document.querySelector('table tbody')
		this.update()
		this.onAdd()
	}

	onAdd() {
		const addNewUser = this.root.querySelector('#add-user-button')
		addNewUser.onclick = () => {
			const { value } = this.root.querySelector('#input-search')
			this.add(value)
			this.root.querySelector('#input-search').value = ''
		}
	}

	update() {

		this.removeTableRows()
		const entriesIsEmpty = this.entries.length <= 0

		if(entriesIsEmpty) {
			const noFavoriteRow = this.createEmptyFavorite()
			this.tbody.append(noFavoriteRow)
		}

		this.entries.forEach(user => {
			const row = this.createRows()
			
			row.querySelector('.user img').src = `https://github.com/${user.login}.png`
			row.querySelector('.user img').alt = `Imagem de ${user.name}`
			row.querySelector('.user a').href = `https://github.com/${user.login}`
			row.querySelector('.user p').textContent = user.name
			row.querySelector('.user span').textContent = `/${user.login}`
			row.querySelector('.repositories').textContent = user.public_repos
			row.querySelector('.followers').textContent = user.followers

			//delete current row
			row.querySelector('.remove').onclick = () => {
				const canIDelete = confirm('Tem certeza que deseja deletar este usuário?')

				if(canIDelete) {
					this.delete(user)
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

	createEmptyFavorite() {
		const tr = document.createElement('tr')

		tr.innerHTML = `
		<td colspan="4">
			<div class="no-favorite">
				<img src="./app/assets/Estrela.svg" alt="imagem de uma estrela com a boca aberta expressando um oh">
				<p>Nenhum favorito ainda</p>
			</div>
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
