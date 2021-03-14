const registerButtonLocator = "[data-cy=register]";
const loginButtonLocator = "[data-cy=login]";
const webAppNameLocator = "[data-cy=webAppName]";

export function registerButton() {
    return cy.get(registerButtonLocator);
}

export function loginButton() {
    return cy.get(loginButtonLocator);
}

export function webAppName() {
    return cy.get(webAppNameLocator);
}