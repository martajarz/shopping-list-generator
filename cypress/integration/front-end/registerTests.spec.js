describe("check happy and unhappy path of registration", () => {

    it("go to register page", () => {
        cy.visit("/");
        cy.get(Cypress.env("registerButton")).click();
        cy.url().should("equal", Cypress.config().baseUrl + "/register");
    })

    it("check if all fields are named correctly", () => {
        cy.get("[data-cy=registerWindowHeading]").contains("Register");
        cy.get("[data-cy=registerEmailInputHeading]").contains("Enter your email address:");
    })

    it("check input fields validation for incorrect values", () => {
        cy.get(Cypress.env("registerEmailInput")).type("invalid.mail@a.a");
        cy.get(Cypress.env("registerEmailMsg")).contains("Please enter the correct address");
        cy.get(Cypress.env("registerEmailInput")).should('have.attr', 'placeholder', 'Enter email');

        cy.get(Cypress.env("registerPasswordInput")).type("Pass567");
        cy.get(Cypress.env("registerPasswordMsg")).contains("Please enter the correct password");
        cy.get(Cypress.env("registerPasswordInput")).should('have.attr', 'placeholder', 'Enter password');


        cy.get(Cypress.env("registerConfirmPasswordInput")).type("Pass567");
        cy.get(Cypress.env("registerConfirmPasswordMsg")).contains("Please enter the correct password");
        cy.get(Cypress.env("registerConfirmPasswordInput")).should('have.attr', 'placeholder', 'Enter password (again)');

    })

    it("unsuccessfully registered --> submit button should not redirect to logged user page", () => {
        cy.get(Cypress.env("registerSubmitButton")).click();
        cy.url().should("equal", Cypress.config().baseUrl + "/register");
    })

    it("check input fields validation for correct values", () => {
        cy.getRandomCredentials().then(value => {
            
            cy.get(Cypress.env("registerEmailInput")).clear().type(value.randomEmailAddress);
            cy.get(Cypress.env("registerEmailMsg")).invoke("val").should("be.empty");

            cy.get(Cypress.env("registerPasswordInput")).clear().type(value.randomPassword);
            cy.get(Cypress.env("registerPasswordMsg")).invoke("val").should("be.empty");

            cy.get(Cypress.env("registerConfirmPasswordInput")).clear().type(value.randomPassword);
            cy.get(Cypress.env("registerConfirmPasswordMsg")).invoke("val").should("be.empty");
        })
    })

    it("successfully registered --> submit button should redirect to logged user page (lists tab)", () => {
        cy.get(Cypress.env("registerSubmitButton")).click();
        cy.url().should("equal", Cypress.config().baseUrl + "/lists");
    })

    it("check if name of web app is presented for user right after registration", () => {
        cy.get(Cypress.env("webAppName")).contains("Shopping list generator");
    })

    it("check if all tabs are available for user right after registration", () => {
        cy.get(Cypress.env("listsTab")).contains("Lists");
        cy.get(Cypress.env("recipesTab")).contains("Recipes");
        cy.get(Cypress.env("ingredientsTab")).contains("Ingredients");
        cy.get(Cypress.env("newRecipeTab")).contains("New recipe");
        cy.get(Cypress.env("addIngredientsToRecipeTab")).contains("Add ingredients to recipe");
        cy.get(Cypress.env("logOutTab")).contains("Log out");
    })
})


