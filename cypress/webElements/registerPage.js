const registerWindowHeadingLocator = "[data-cy=registerWindowHeading]";
const registerEmailInputHeadingLocator = "[data-cy=registerEmailInputHeading]";
const registerEmailInputLocator = "[data-cy=registerEmailInput]";
const registerEmailMsgLocator = "[data-cy=registerEmailMsg]";
const registerPasswordInputLocator = "[data-cy=registerPasswordInput]";
const registerPasswordMsgLocator = "[data-cy=registerPasswordMsg]";
const registerConfirmPasswordInputLocator = "[data-cy=registerConfirmPasswordInput]";
const registerConfirmPasswordMsgLocator = "[data-cy=registerConfirmPasswordMsg]";
const registerSubmitButtonLocator = "[data-cy=registerSubmitButton]";

export function windowHeading() {
    return cy.get(registerWindowHeadingLocator);
}

export function emailInputHeading() {
    return cy.get(registerEmailInputHeadingLocator);
}

export function emailInput() {
    return cy.get(registerEmailInputLocator);
}

export function emailMsg() {
    return cy.get(registerEmailMsgLocator);
}

export function passwordInput() {
    return cy.get(registerPasswordInputLocator);
}

export function passwordMsg() {
    return cy.get(registerPasswordMsgLocator);
}

export function confirmPasswordInput() {
    return cy.get(registerConfirmPasswordInputLocator);
}

export function confirmPasswordMsg() {
    return cy.get(registerConfirmPasswordMsgLocator);
}

export function submitButton() {
    return cy.get(registerSubmitButtonLocator);
}

