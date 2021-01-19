import * as NRTE from "/home/pio/projects/shopping-list-generator/cypress/webElements/newRecipeTabElements";
import * as RD from "/home/pio/projects/shopping-list-generator/cypress/support/generators/randomData";
import { listSelectLocator } from "../../../webElements/ingredientsTabElements";

Cypress.Commands.add("addRecipe", function (recipe) {
    console.log(recipe);
    NRTE.recipeNameInput().type(recipe.name);
    NRTE.recipeCategoryInput().type(recipe.category);
    NRTE.recipeLinkInput().type(recipe.link);
    NRTE.recipePictureUrlInput().type(recipe.pictureUrl);

    if (recipe.isVisibleToAllUsers) {
        NRTE.recipeVisibleToAllRadioButton().click();
    }
    NRTE.recipeSubmitButton().click();
})