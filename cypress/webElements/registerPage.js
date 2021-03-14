const registerWindowHeadingLocator = "[data-cy=registerWindowHeading]";
const registerEmailInputHeadingLocator = "[data-cy=registerEmailInputHeading]";
const registerEmailInputLocator = "[data-cy=registerEmailInput]";
const registerEmailMsgLocator = "[data-cy=registerEmailMsg]";
const registerPasswordInputHeadingLocator = "[data-cy=registerPasswordInputHeading]";
const registerPasswordInputLocator = "[data-cy=registerPasswordInput]";
const registerPasswordMsgLocator = "[data-cy=registerPasswordMsg]";
const registerConfirmPasswordInputHeadingLocator = "[data-cy=registerConfirmPasswordInputHeading]";
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

export function passwordInputHeading() {
    return cy.get(registerPasswordInputHeadingLocator);
}

export function passwordInput() {
    return cy.get(registerPasswordInputLocator);
}

export function passwordMsg() {
    return cy.get(registerPasswordMsgLocator);
}

export function confirmPasswordInputHeading() {
    return cy.get(registerConfirmPasswordInputHeadingLocator)
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

