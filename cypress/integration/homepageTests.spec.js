describe("check if homepage is displayed properly", () => {

    it("baseUrl successfully loads", () => {
        cy.visit("/");
        cy.url().should("equal", "http://martajarz.pythonanywhere.com/");
    })

    it("check name of the homepage", () => {
        cy.get(Cypress.env("homepageName")).contains("Shopping list generator");
    })

    it("check if main functions at top of the page are available", () => {
        cy.get(Cypress.env("loginButton")).contains("Log In");
        cy.get(Cypress.env("registerButton")).contains("Register");
    })
})

