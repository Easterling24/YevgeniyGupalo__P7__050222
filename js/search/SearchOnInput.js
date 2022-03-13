class RecipesList {
	constructor(recipe) {
		this.name = recipe;
		this.recipesWrapper = document.querySelector('.recipe-wrapper');
		this.searchField = document.querySelector('.input-search-field');
		this.searchedRecipe = '';
		this.recipes = recipe;
	}

	async ShowAvailbaleRecipes() {
		this.recipesWrapper.innerHTML = '';

		this.recipes
			.filter(
				(recipe) =>
					removeAccents(recipe.name)
						.trim()
						.toLowerCase()
						.includes(this.searchedRecipe.toLowerCase()) ||
            removeAccents	(recipe.description).trim().toLowerCase().includes(this.searchedRecipe.toLowerCase()) ||
					 recipe.ingredients.find((elt) =>
           removeAccents(elt.ingredient).trim().toLowerCase().includes(this.searchedRecipe.toLowerCase())
					)
			)
			.forEach((recipe) => {
				const Template = new RecipeCard(recipe);
				this.recipesWrapper.appendChild(Template.createRecipeCard());
			});
	}

	async ShowInitialList() {
		this.recipesWrapper.innerHTML = '';

		this.recipes.map((recipe) => new Recipe(recipe)).forEach((recipe) => {
			const Template = new RecipeCard(recipe);
			this.recipesWrapper.appendChild(Template.createRecipeCard());
		});
	}

	onInputSearch() {
		this.searchField.addEventListener('input', (e) => {
			this.searchedRecipe = e.target.value;

			if (this.searchedRecipe.length > 3) {
				this.ShowAvailbaleRecipes();
			} else if (this.searchedRecipe.length < 3) {
				this.ShowInitialList();
			} else {

				return 


			}
		});
	}
}
