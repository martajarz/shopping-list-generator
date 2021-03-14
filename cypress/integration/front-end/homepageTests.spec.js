import * as homePage from "../../webElements/homePage";

describe("check if homepage is displayed properly", () => {

    it("baseUrl successfully loads --> check name of the homepage", () => {
        cy.visit("/");
        cy.url().should("equal", Cypress.config().baseUrl + "/");
        homePage.webAppName().contains("Shopping list generator");
    })

    it("check if login and register tab at top of the page are available", () => {
        homePage.loginButton().contains("Log In");
        homePage.registerButton().contains("Register");
    })
})

