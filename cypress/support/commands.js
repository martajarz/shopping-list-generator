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

function generateRandomEmailAddress() {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const randomString =  Math.random().toString(36).substr(2, 5);
    const randomEmailAddress = randomString + "." + randomString + randomNumber + "@gmail.com";

    return randomEmailAddress;
}
Cypress.Commands.add("generateRandomEmailAddress", generateRandomEmailAddress);

function generateRandomPassword() {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const randomString =  Math.random().toString(36).substr(2, 5);
    const randomPassword = randomString + "~!@#$%^&*()_-+={}[];:'\|<,>.?/" + randomNumber;

    return randomPassword;
}
Cypress.Commands.add("generateRandomPassword", generateRandomPassword);
    
function getRandomCredentials() {
    const randomCredentials = {
        randomEmailAddress : generateRandomEmailAddress(), 
        randomPassword : generateRandomPassword()
    };
    return cy.wrap(randomCredentials);
}
Cypress.Commands.add("getRandomCredentials", getRandomCredentials);
