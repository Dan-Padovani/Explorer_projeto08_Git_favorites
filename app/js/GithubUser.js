// Consulta user github
export class GithubUser {
	static search(username) {
		const endpoint = `https://api.github.com/users/${username}`

		return fetch(endpoint)
		.then(data => data.json())
		.then(data => {
			const { login, name, public_repos, followers } = data

			return {
				login,
				name,
				public_repos,
				followers
			}
		})
	}
}