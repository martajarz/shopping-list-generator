import * as homePage from "../../webElements/homePage";
import * as loginPage from "../../webElements/loginPage";
import * as mainMenu from "../../webElements/mainMenu";

describe("check happy and unhappy path of login", () => {

    it("unsuccessfull login --> check fields validation", () => {
        cy.visit(Cypress.config().baseUrl);
        homePage.loginButton().click();

        loginPage.emailInput().type("invalid@mailAddressFormat");
        loginPage.emailMsg().contains("Please enter the correct address");
        loginPage.emailInput().clear();

        loginPage.emailInput().type("emailAddressNotInDatabase@gmail.com");
        loginPage.emailMsg().contains("Please enter the correct address");
        loginPage.passwordInput().type("testPassword1234567890");

        loginPage.submitButton().click();
        cy.url().should("equal", Cypress.config().baseUrl + "/login");
    })

    it("successfull login", () => {
        cy.getRandomCredentials()
            .then(value => {
                cy.registerRequest(value.email, value.password)

                cy.visit("/");
                mainMenu.logOutTab().click();

                loginPage.emailInput().type(value.email);
                loginPage.emailMsg().invoke("val").should("be.empty");

                loginPage.passwordInput().type(value.password);

                loginPage.submitButton().click();
                cy.url().should("equal", Cypress.config().baseUrl + "/lists");
            })
    })

    it("check if name of web app is presented for user right after login", () => {
        mainMenu.webAppName().contains("Shopping list generator");
    })

    it("check if all tabs are available for user right after login", () => {
        mainMenu.listsTab().contains("Lists");
        mainMenu.recipesTab().contains("Recipes");
        mainMenu.ingredientsTab().contains("Ingredients");
        mainMenu.newRecipeTab().contains("New recipe");
        mainMenu.addIngredientsToRecipeTab().contains("Add ingredients to recipe");
        mainMenu.logOutTab().contains("Log out");
    })
})





