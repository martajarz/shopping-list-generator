describe("check if homepage is displayed properly", () => {

    it("baseUrl successfully loads --> check name of the homepage", () => {
        cy.visit("/");
        cy.url().should("equal", Cypress.config().baseUrl + "/");
        cy.get(Cypress.env("webAppName")).contains("Shopping list generator");
    })

    it("check if login and register tab at top of the page are available", () => {
        cy.get(Cypress.env("loginButton")).contains("Log In");
        cy.get(Cypress.env("registerButton")).contains("Register");
    })
})

