import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { LoggingService } from "../logging.service";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientChangeSubject: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private loggingService: LoggingService
  ) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientChangeSubject = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => (this.ingredients = ingredients)
    );

    this.loggingService.printLog("ShoppingListComponent, NgOnInit");
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.ingredientChangeSubject.unsubscribe();
  }
}
