const loginEmailInputLocator = "[data-cy=loginEmailInput]";
const loginEmailMsgLocator = "[data-cy=loginEmailMsg]";
const loginPasswordInputLocator = "[data-cy=loginPasswordInput]";
const loginSubmitButtonLocator = "[data-cy=loginSubmitButton]";

export function emailInput(){
    return cy.get(loginEmailInputLocator);
}

export function emailMsg(){
    return cy.get(loginEmailMsgLocator);
}

export function passwordInput(){
    return cy.get(loginPasswordInputLocator);
}

export function submitButton(){
    return cy.get(loginSubmitButtonLocator);
}