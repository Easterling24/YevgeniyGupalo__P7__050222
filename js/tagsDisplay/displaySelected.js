class DisplaySelectedTags {
	constructor(data) {
		this.recipes = data.recipes;
		this.selectedTags = data.selected;
		this.selectedArea = document.getElementById('selected-tags');

		this.ingredientContainer = document.querySelector('.ingredients-list');
		this.applianceContainer = document.querySelector('.appliance-list');
		this.ustensilsContainer = document.querySelector('.ustensils-list');
	}

	listingTags() {
		let ingredientsList = [];
		let appliance = [];
		let ustensilList = [];
		this.recipes.filter((recipe) =>
			recipe.ingredients.map((elt) => ingredientsList.push(elt.ingredient.toLowerCase()))
		);
		this.recipes.filter((recipe) => recipe.ustensils.map((elt) => ustensilList.push(elt.toLowerCase())));
		this.recipes.filter((recipe) => appliance.push(recipe.appliance.toLowerCase()));

		const listedTags = `${this.selectedTags
			.map((elt) => {
				return `  <p class=${ustensilList.includes(elt.toLowerCase())
					? 'ustensilsTag'
					: appliance.includes(elt.toLowerCase())
						? 'applianceTag'
						: ingredientsList.includes(elt.toLowerCase())
							? 'ingredientTag'
							: 'noTag'}>${elt} <button> <i class="fa-solid fa-xmark"></i></button></p>`;
			})
			.join(' ')}
		`;
		this.selectedArea.innerHTML = listedTags;

		const removeTag = (e) => {
			const tag = e.target.parentNode.parentNode.textContent;

			for (let i = 0; i < this.selectedTags.length; i++) {
				if (this.selectedTags[i] === tag.trim()) {
					this.selectedTags.splice(i, 1);
				}
			}

			for (let i = 0; i < this.ingredientContainer.children.length; i++) {
				if (this.ingredientContainer.children[i].innerHTML === tag.trim()) {
					this.ingredientContainer.children[i].style.display = 'flex';
				}
			}
			for (let i = 0; i < this.applianceContainer.children.length; i++) {
				if (this.applianceContainer.children[i].innerHTML === tag.trim()) {
					this.applianceContainer.children[i].style.display = 'flex';
				}
			}
			for (let i = 0; i < this.ustensilsContainer.children.length; i++) {
				if (this.ustensilsContainer.children[i].innerHTML === tag.trim()) {
					this.ustensilsContainer.children[i].style.display = 'flex';
				}
			}

			new SearchOnTag({ selected: this.selectedTags, recipes: this.recipes }).displayOnTag();
			new DisplaySelectedTags({ selected: this.selectedTags, recipes: this.recipes }).listingTags();
		};

		for (let tag of this.selectedArea.children) {
			tag.children[0].addEventListener('click', removeTag);
		}
	}
}