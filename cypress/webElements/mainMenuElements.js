const listsTabLocator = "[data-cy=listsTab]";
const recipesTabLocator = "[data-cy=recipesTab]";
const ingredientsTabLocator = "[data-cy=ingredientsTab]";
const newRecipeTabLocator = "[data-cy=newRecipeTab]";
const addIngredientsToRecipeTabLocator = "[data-cy=addIngredientsToRecipeTab]";
const logOutTabLocator = "[data-cy=logOutTab]";


export function listsTab() {
  return cy.get(listsTabLocator);
}

export function recipesTab() {
  return cy.get(recipesTabLocator);
}

export function ingredientsTab() {
  return cy.get(ingredientsTabLocator);
}

export function newRecipeTab() {
  return cy.get(newRecipeTabLocator);
}

export function addIngredientsToRecipeTab() {
  return cy.get(addIngredientsToRecipeTabLocator);
}

export function logOutTab() {
  return cy.get(logOutTabLocator);
}

