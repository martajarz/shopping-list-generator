import * as homePage from "../../webElements/homePage";
import * as registerPage from "../../webElements/registerPage";
import * as mainMenu from "../../webElements/mainMenu";

describe("check happy and unhappy path of registration", () => {

    it("go to register page", () => {
        cy.visit("/");
        homePage.registerButton().click();
        cy.url().should("equal", Cypress.config().baseUrl + "/register");
    })

    it("check if all fields are named correctly", () => {
        registerPage.windowHeading().contains("Register");
        registerPage.emailInputHeading().contains("Enter your email address:");
    })

    it("check input fields validation for incorrect values", () => {
        registerPage.emailInput().type("invalid.mail@a.a");
        registerPage.emailMsg().contains("Please enter the correct address");
        registerPage.emailInput().should('have.attr', 'placeholder', 'Enter email');

        registerPage.passwordInput().type("Pass567");
        registerPage.passwordMsg().contains("Please enter the correct password");
        registerPage.passwordInput().should('have.attr', 'placeholder', 'Enter password');

        registerPage.confirmPasswordInput().type("Pass567");
        registerPage.confirmPasswordMsg().contains("Please enter the correct password");
        registerPage.confirmPasswordInput().should('have.attr', 'placeholder', 'Enter password (again)');
    })

    it("unsuccessfully registered --> submit button should not redirect to logged user page", () => {
        registerPage.submitButton().click();
        cy.url().should("equal", Cypress.config().baseUrl + "/register");
    })

    it("check input fields validation for correct values", () => {
        cy.getRandomCredentials().then(value => {
            
            registerPage.emailInput().clear().type(value.randomEmailAddress);
            registerPage.emailMsg().invoke("val").should("be.empty");

            registerPage.passwordInput().clear().type(value.randomPassword);
            registerPage.passwordMsg().invoke("val").should("be.empty");

            registerPage.confirmPasswordInput().clear().type(value.randomPassword);
            registerPage.confirmPasswordMsg().invoke("val").should("be.empty");
        })
    })

    it("successfully registered --> submit button should redirect to logged user page (lists tab)", () => {
        registerPage.submitButton().click();
        cy.url().should("equal", Cypress.config().baseUrl + "/lists");
    })

    it("check if name of web app is presented for user right after registration", () => {
        mainMenu.webAppName().contains("Shopping list generator");
    })

    it("check if all tabs are available for user right after registration", () => {
        mainMenu.listsTab().contains("Lists");
        mainMenu.recipesTab().contains("Recipes");
        mainMenu.ingredientsTab().contains("Ingredients");
        mainMenu.newRecipeTab().contains("New recipe");
        mainMenu.addIngredientsToRecipeTab().contains("Add ingredients to recipe");
        mainMenu.logOutTab().contains("Log out");
    })
})


