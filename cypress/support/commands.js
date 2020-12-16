// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

function generateRandomString() {
    let randomString = "";

    for (let i = 0; i < 3; i++) {
        randomString += Math.random().toString(36).substr(2, 5);
    }
    return randomString;
}
Cypress.Commands.add("generateRandomString", generateRandomString);

function generateRandomEmailAddress() {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const randomString = Math.random().toString(36).substr(2, 5);
    const randomEmailAddress = randomString + "." + randomString + randomNumber + "@gmail.com";

    return randomEmailAddress;
}
Cypress.Commands.add("generateRandomEmailAddress", generateRandomEmailAddress);

function generateRandomPassword() {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const randomString = Math.random().toString(36).substr(2, 5);
    const randomPassword = randomString + "~!@#$%^&*()_-+={}[];:'\|<,>.?/" + randomNumber;

    return randomPassword;
}
Cypress.Commands.add("generateRandomPassword", generateRandomPassword);

function getRandomCredentials() {
    const randomCredentials = {
        randomEmailAddress: generateRandomEmailAddress(),
        randomPassword: generateRandomPassword()
    };
    return randomCredentials;
}
Cypress.Commands.add("getRandomCredentials", getRandomCredentials);

function postRegister(emailAddress, password) {
    cy.request({
        method: "POST",
        url: "/register",
        form: true,
        followRedirect: false,
        body: { username: emailAddress, password: password }
    })
}
Cypress.Commands.add("postRegister", postRegister);

function postLogin(emailAddress, password) {
    cy.request({
        method: "POST",
        url: "/login",
        form: true,
        followRedirect: false,
        body: { username: emailAddress, password: password }
    })
}
Cypress.Commands.add("postLogin", postLogin);

function checkResponseCodeAndRedirectUrl(resp, code, path) {
    expect(resp.status).to.eq(code)
    expect(resp.redirectedToUrl).to.eq(Cypress.config().baseUrl + path)
}
Cypress.Commands.add("checkResponseCodeAndRedirectUrl", checkResponseCodeAndRedirectUrl);



