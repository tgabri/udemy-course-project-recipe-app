import { Injectable } from "@angular/core";

import { Recipe } from "./recipe-model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     "Lasagne",
  //     "Lovely lasagne.",
  //     "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/mary_berrys_lasagne_al_16923_16x9.jpg",
  //     [
  //       new Ingredient("onion", 2),
  //       new Ingredient("carrot", 1),
  //       new Ingredient("celery", 1),
  //       new Ingredient("minced beef", 2),
  //       new Ingredient("plum tomato", 4),
  //       new Ingredient("oregano", 1)
  //     ]
  //   ),
  //   new Recipe(
  //     "Rakott Krumpli",
  //     "Best of the best",
  //     "http://www.mindmegette.hu/images/231/O/img_4348.jpg",
  //     [
  //       new Ingredient("chorizo", 1),
  //       new Ingredient("potato", 2),
  //       new Ingredient("eggs", 2),
  //       new Ingredient("cheese", 2),
  //       new Ingredient("single cream", 1),
  //       new Ingredient("soured cream", 1)
  //     ]
  //   )
  // ];
  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
