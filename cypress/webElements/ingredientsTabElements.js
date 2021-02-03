const ingredientNameCategoryInputLocator = "#searchIngredient > span > input.form-control.typeahead.tt-input";
const ingredientMeasureInputLocator = "[data-cy=ingredientMeasureInput]";
const ingredientUnitSelectLocator = "[data-cy=ingredientUnitSelect]";
const ingredientListSelectLocator = "[data-cy=ingredientsSelectList]";

export function nameCategoryInputField() {
    return cy.get(ingredientNameCategoryInputLocator);
}

export function measureInputField() {
    return cy.get(ingredientMeasureInputLocator);
}

export function unitSelectLocator() {
    return cy.get(ingredientUnitSelectLocator);
}

export function listSelectLocator() {
    return cy.get(ingredientListSelectLocator);
}