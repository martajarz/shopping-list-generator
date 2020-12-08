describe("check if homepage is displayed properly", () => {

    it("baseUrl successfully loads", () => {
        cy.visit("/");
        cy.url().should("equal", "http://martajarz.pythonanywhere.com/");
    })

    it("check name of the homepage", () => {
        cy.get('.navbar-brand').contains("Shopping list generator");
    })

    it("check if main functions at top of the page are available", () => {
        cy.get(':nth-child(1) > .nav-link').contains("Log In");
        cy.get(Cypress.env("registerButton")).contains("Register");
    })
})

