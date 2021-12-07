const getUserData = () => {

	const userData1 = document.getElementById('pokemon-name1').value;
	const userData2 = document.getElementById('pokemon-name2').value;

	return [userData1, userData2]
}

const getPokemonApiData = async (data) => {

	const pokemon = [],
		pokemonData = [];

	for (let i = 0; i < data.length; i++) {
		pokemon[i] = await fetch(`https://pokeapi.co/api/v2/pokemon/${data[i]}`);
		pokemonData[i] = await pokemon[i].json();
	}

	return [pokemonData[0], pokemonData[1]];
};

function showPokemonData(e) {
	e.preventDefault();

	const userData = getUserData();

	getPokemonApiData(userData)
		.then(
			function(results) {

				const name = [],
					height = [],
					weight = [],
					abilities = [];

				for (let i = 0; i < results.length; i++) {
					name[i] = results[i].species.name;
					height[i] = results[i].height;
					weight[i] = results[i].weight;
					abilities[i] = [];
					for (let ability of results[i].abilities) {
						abilities[i].push(ability.ability.name);
					}

					document.getElementById('pokemon-info' + (i + 1)).innerHTML = `Name: ${name[i]}<br/>Height: ${height[i]}<br/>Weight: ${weight[i]}<br/>Abilities: ${abilities[i].join(", ")}`;

				}

			})
		.catch(function(error) {
			alert(error);
		});
}

document.getElementById('poke-form').addEventListener('submit', showPokemonData);
