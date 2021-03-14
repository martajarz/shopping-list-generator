const ingredientNameCategoryInputLocator = "#searchIngredient > span > input.form-control.typeahead.tt-input";
const ingredientMeasureInputLocator = "[data-cy=ingredientMeasureInput]";
const ingredientUnitSelectLocator = "[data-cy=ingredientUnitSelect]";
const ingredientListSelectLocator = "[data-cy=ingredientsSelectList]";
const ingredientSubmitButtonLocator = "[data-cy=ingredientSubmitButton]";

export function nameCategoryInput() {
    return cy.get(ingredientNameCategoryInputLocator);
}

export function measureInput() {
    return cy.get(ingredientMeasureInputLocator);
}

export function unitSelect() {
    return cy.get(ingredientUnitSelectLocator);
}

export function listSelect() {
    return cy.get(ingredientListSelectLocator);
}

export function submitButton() {
    return cy.get(ingredientSubmitButtonLocator);
}