const addNewListInputFieldLocator = "[data-cy=addNewListInput]";
const addNewListButtonLocator = "[data-cy=addNewListButton]";
const listSelectLocator = "[data-cy=listSelect]";
const deleteListButtonLocator = "[data-cy=deleteListButton]";

export function addNewListInputField() {
  return cy.get(addNewListInputFieldLocator);
}

export function addNewListButton() {
  return cy.get(addNewListButtonLocator);
}

export function listSelect() {
  return cy.get(listSelectLocator);
}

export function deleteListButton() {
  return cy.get(deleteListButtonLocator);
}
