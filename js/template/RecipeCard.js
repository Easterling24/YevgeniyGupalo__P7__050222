class RecipeCard {
	constructor(recipe) {
		this.name = recipe.name;
		this.time = recipe.time;
		this.servings = recipe.servings;
		this.ingredients = recipe.ingredients;
		this.description = recipe.description;
		this.appliance = recipe.appliance;
		this.ustensils = recipe.ustensils;
		this.paragraphs = document.querySelectorAll('.first');
	}

	createRecipeCard() {
		for (let par of this.paragraphs) {
			if (par.innerHTML.length > 20) {
				par.classList.add('width-fix');
			}
		}

		const recipeWrapper = document.createElement('article');
		recipeWrapper.classList.add('recipe-card-wrapper');

		const recipeCard = `
        <div class="first-container"></div>
		<div class="second-container">
		<h3>${this.name}</h3>
		<div class="timer"> <i class="far fa-clock"></i>${this.time} min</div>
		</div>
		<div class="third-container">
		<div class="ingridients-container">

		${this.ingredients
			.map((elt) => {
				return elt.ingredient && elt.quantity && elt.unit
					? `
				<div class="inline-ingredients">
				<p class="first"> ${elt.ingredient}:</p> 
				</br>
				<p>  &nbsp; ${elt.quantity}</p>
				<p> &nbsp;${elt.unit && elt.unit.includes('grammes'.toLowerCase().trim())
					? elt.unit.slice(0, 1)
					: elt.unit.toLowerCase().trim().includes('cl'.toLowerCase().trim())
						? elt.unit.slice(0, 0)
						: elt.unit.toLowerCase().trim().includes('Litres'.toLowerCase().trim())
							? elt.unit.slice(0, 3)
							: elt.unit.toLowerCase().trim().includes('sachets'.toLowerCase().trim())
								? elt.unit.slice(0, 0)
								: elt.unit.toLowerCase().trim().includes('tranches'.toLowerCase().trim())
									? elt.unit.slice(0, 1)
									: elt.unit.toLowerCase().trim().includes('cuillère à soupe'.toLowerCase().trim())
										? elt.unit.slice(0,8)
										: elt.unit.toLowerCase().trim().includes('cuillères à soupe'.toLowerCase().trim())
											? elt.unit.slice(0, 9)
											: elt.unit}</p> 
				</div>`
					: null;
			})
			.join('')}
		</div>
		<div class="description"><p>${this.description}</p></div>
		</div>
        `;
		recipeWrapper.innerHTML = recipeCard;
		return recipeWrapper;
	}
}
