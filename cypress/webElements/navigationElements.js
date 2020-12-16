const listsTabLocator = "[data-cy=listsTab]";

export function listsTab() {
  return cy.get(listsTabLocator);
}
