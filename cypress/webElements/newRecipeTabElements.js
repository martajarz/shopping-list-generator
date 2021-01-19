const recipeNameInputLocator = "[data-cy=recipeNameInput]";
const recipeCategoryInputLocator = "[data-cy=recipeCategoryInput]";
const recipeLinkInputLocator = "[data-cy=recipeLinkInput]";
const recipePictureUrlInputLocator = "[data-cy=recipePictureUrlInput]";
const recipeVisibleToAllUsersRadioButtonLocator = "[data-cy=recipeVisibleToAllRadioButton]";
const recipeSubmitButtonLocator = "[data-cy=recipeSubmitButton]";

export function recipeNameInput() {
    return cy.get(recipeNameInputLocator);
}

export function recipeCategoryInput() {
    return cy.get(recipeCategoryInputLocator);
}

export function recipeLinkInput() {
    return cy.get(recipeLinkInputLocator);
}

export function recipePictureUrlInput() {
    return cy.get(recipePictureUrlInputLocator);
}

export function recipeVisibleToAllRadioButton() {
    return cy.get(recipeVisibleToAllUsersRadioButtonLocator);
}

export function recipeSubmitButton() {
    return cy.get(recipeSubmitButtonLocator);
}