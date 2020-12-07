describe("check register page", () => {

    it("go to register page", () => {
        cy.visit("/");
        cy.get(Cypress.env("registerButton")).click();
        cy.url().should("equal", "http://martajarz.pythonanywhere.com/register");
    })

    it("check if all fields are named correctly", () => {
        cy.get('h4').contains("Register");
        cy.get('.form > :nth-child(1) > :nth-child(1)').contains("Enter your email address:");
        cy.get('#registerInputEmail').should('have.attr', 'placeholder', 'Enter email');
    })

    it("check input fields validation for incorrect values", () => {
        cy.get('#registerInputEmail').type("test.mail@a.a");
        cy.get('#msgEmail').contains("Please enter the correct address");

        cy.get('#registerInputPassword').type("Pass567");
        cy.get('#msgPassword').contains("Please enter the correct password");

        cy.get('#registerConfirmPassword').type("Pass567");
        cy.get('#msgConfirm').contains("Please enter the correct password");
    })

    it("unsuccessfully registered --> submit button should not redirect to logged user page", () => {
        cy.url().should("equal", "http://martajarz.pythonanywhere.com/register");
    })

    it("check input fields validation for correct values", () => {
        cy.getRandomCredentials().then(value => {

            cy.get('#registerInputEmail').clear().type(value.randomEmailAddress);
            cy.get('#msgEmail').invoke("val").should("be.empty");

            cy.get('#registerInputPassword').clear().type(value.randomPassword);
            cy.get('#msgPassword').invoke("val").should("be.empty");

            cy.get('#registerConfirmPassword').clear().type(value.randomPassword);
            cy.get('#msgConfirm').invoke("val").should("be.empty");
        })
    })

    it("successfully registered --> submit button should redirect to logged user page", () => {
        cy.get('.btn').click();
        cy.url().should("equal", "http://martajarz.pythonanywhere.com/lists");
    })
})


