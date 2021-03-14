import * as newRecipePage from "/home/pio/projects/shopping-list-generator/cypress/webElements/newRecipePage";

Cypress.Commands.add("addRecipe", function (recipe) {
    console.log(recipe);
    newRecipePage.recipeNameInput().type(recipe.name);
    newRecipePage.recipeCategoryInput().type(recipe.category);
    newRecipePage.recipeLinkInput().type(recipe.link);
    newRecipePage.recipePictureUrlInput().type(recipe.pictureUrl);

    if (recipe.isVisibleToAllUsers) {
        newRecipePage.recipeVisibleToAllRadioButton().click();
    }
    newRecipePage.recipeSubmitButton().click();
})