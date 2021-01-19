import { internet } from "faker";
import { listSelectLocator } from "../../webElements/ingredientsTabElements";
import * as MME from "../../webElements/mainMenuElements";
import * as RD from "/home/pio/projects/shopping-list-generator/cypress/support/generators/randomData";
import * as NRTE from "/home/pio/projects/shopping-list-generator/cypress/webElements/newRecipeTabElements";



describe("check functionality of adding recipes", () => {

    const firstUserCredentials = RD.getRandomCredentials();
    const secondUserCredentials = RD.getRandomCredentials();
    let recipes = [];

    function Recipe(name, category, link, pictureUrl, isVisibleToAllUsers) {
        this.name = name;
        this.category = category;
        this.link = link;
        this.pictureUrl = pictureUrl;
        this.isVisibleToAllUsers = isVisibleToAllUsers;
    }

    const createRecipe = function (isVisibleToAllUsers) {
        const name = RD.generateRandomString();
        const category = RD.generateRandomString();
        const link = "https://" + RD.generateRandomString() + ".com";
        const pictureUrl = "https://picsum.photos/400/300";

        const recipe = new Recipe(name, category, link, pictureUrl, isVisibleToAllUsers);
        return recipe;
    }

    before("register first user and go to new recipe tab", () => {
        cy.registerRequest(firstUserCredentials.email, firstUserCredentials.password);
        cy.visit("/");
        MME.newRecipeTab().click();
    })

    it("add 5 recipes not visible to all users", () => {
        for (let i = 0; i < 2; i++) {
            recipes[i] = createRecipe(false);
            cy.addRecipe(recipes[i]);
        }
        MME.logOutTab().click();

        cy.registerRequest(secondUserCredentials.email, secondUserCredentials.password);
        cy.visit("/");
        MME.recipesTab().click();

        for(let i = 0; i < 1; i++){
            cy.get('.tt-input').type(recipes[i].name);
            cy.get(".tt-menu > div > div").select(recipes[i].name);
            /*
            cy.get('#outputHeader > :nth-child(1) > h5').should("have.value", recipes[i].name);
            cy.get('#outputHeader > :nth-child(1) > h5').should("have.value", "Category: " + recipes[i].category);
*/
        }

    })

    it("add 5 recipes visible to all users", () => {
        cy.loginRequest(firstUserCredentials.email, firstUserCredentials.password);
        cy.visit("/");
        MME.newRecipeTab().click();

        for (let i = 0; i < 2; i++) {
            recipes[i] = createRecipe(true);
            cy.addRecipe(recipes[i]);
        }
    })
})