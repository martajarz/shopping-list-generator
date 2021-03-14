import * as homePage from "../../webElements/homePage";
import * as registerPage from "../../webElements/registerPage";
import * as mainMenu from "../../webElements/mainMenu";

describe("test happy and unhappy path of user registration", () => {

    it("go to register page", () => {
        cy.visit("/");
        homePage.registerButton().click();
        cy.url().should("equal", Cypress.config().baseUrl + "/register");
    })

    it("check if all fields are named correctly", () => {
        registerPage.windowHeading().contains("Register");

        registerPage.emailInputHeading().contains("Enter your email address:");
        registerPage.emailInput().should("have.attr", "placeholder", "Enter email");

        registerPage.passwordInputHeading().contains("Create a password (At least 8 characters long).");
        registerPage.passwordInput().should('have.attr', 'placeholder', 'Enter password');

        registerPage.confirmPasswordInputHeading().contains("Confirm your password.");
        registerPage.confirmPasswordInput().should('have.attr', 'placeholder', 'Enter password (again)');

        registerPage.submitButton().contains("Submit");
    })

    it("check input fields validation for incorrect values", () => {
        registerPage.emailInput().type("invalid.mail@a.a");
        registerPage.emailMsg().contains("Please enter the correct address");

        registerPage.passwordInput().type("Pass567");
        registerPage.passwordMsg().contains("Please enter the correct password");

        registerPage.confirmPasswordInput().type("Pass567");
        registerPage.confirmPasswordMsg().contains("Please enter the correct password");
    })

    it("unsuccessfully registered --> submit button should not redirect to logged user page", () => {
        registerPage.submitButton().click();
        cy.url().should("equal", Cypress.config().baseUrl + "/register");
    })

    it("check input fields validation for correct values", () => {
        cy.getRandomCredentials().then(value => {
            registerPage.emailInput().clear().type(value.email);
            registerPage.emailMsg().invoke("val").should("be.empty");

            registerPage.passwordInput().clear().type(value.password);
            registerPage.passwordMsg().invoke("val").should("be.empty");

            registerPage.confirmPasswordInput().clear().type(value.password);
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


