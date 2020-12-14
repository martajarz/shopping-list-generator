describe("check happy and unhappy path of login", () => {

    it("unsuccessfull login --> check fields validation", () => {
        cy.visit(Cypress.config().baseUrl);
        cy.get(Cypress.env("loginButton")).click();

        cy.get(Cypress.env("loginEmailInput")).type("invalid@mailAddressFormat");
        cy.get(Cypress.env("loginEmailMsg")).contains("Please enter the correct address");
        cy.get(Cypress.env("loginEmailInput")).clear();

        cy.get(Cypress.env("loginEmailInput")).type("emailAddressNotInDatabase@gmail.com");
        cy.get(Cypress.env("loginEmailMsg")).contains("Please enter the correct address");
        cy.get(Cypress.env("loginPasswordInput")).type("testPassword1234567890");

        cy.get(Cypress.env("loginSubmitButton")).click();
        cy.url().should("equal", Cypress.config().baseUrl + "/login");
    })

    it("successfull login", () => {
        cy.getRandomCredentials()
            .then(value => {
                cy.postRegister(value.randomEmailAddress, value.randomPassword)

                cy.visit(Cypress.config().baseUrl)
                cy.get(Cypress.env("logOutTab")).click();

                cy.get(Cypress.env("loginEmailInput")).type(value.randomEmailAddress);
                cy.get(Cypress.env("loginEmailMsg")).invoke("val").should("be.empty");

                cy.get(Cypress.env("loginPasswordInput")).type(value.randomPassword);

                cy.get(Cypress.env("loginSubmitButton")).click();
                cy.url().should("equal", Cypress.config().baseUrl + "/lists");
            })
    })

    it("check if name of web app is presented for user right after login", () => {
        cy.get(Cypress.env("webAppName")).contains("Shopping list generator");
    })

    it("check if all tabs are available for user right after login", () => {
        cy.get(Cypress.env("listTab")).contains("Lists");
        cy.get(Cypress.env("recipesTab")).contains("Recipes");
        cy.get(Cypress.env("ingredientsTab")).contains("Ingredients");
        cy.get(Cypress.env("newRecipeTab")).contains("New recipe");
        cy.get(Cypress.env("addIngredientsToRecipeTab")).contains("Add ingredients to recipe");
        cy.get(Cypress.env("logOutTab")).contains("Log out");
    })
})





