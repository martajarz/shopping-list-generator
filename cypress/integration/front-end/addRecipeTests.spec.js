import * as mainMenu from "../../webElements/mainMenu";
import * as randomData from "/home/pio/projects/shopping-list-generator/cypress/support/generators/randomData";

describe("test the functionality of adding recipes", () => {

    const firstUserCredentials = randomData.getRandomCredentials();
    const secondUserCredentials = randomData.getRandomCredentials();
    let recipes = [];
    const recipesAmount = 5;

    function Recipe(name, category, link, pictureUrl, isVisibleToAllUsers) {
        this.name = name;
        this.category = category;
        this.link = link;
        this.pictureUrl = pictureUrl;
        this.isVisibleToAllUsers = isVisibleToAllUsers;
    }

    const createRecipe = function (isVisibleToAllUsers) {
        const name = randomData.generateRandomString();
        const category = randomData.generateRandomString();
        const link = "https://" + randomData.generateRandomString() + ".com";
        const pictureUrl = "https://picsum.photos/400/300";

        const recipe = new Recipe(name, category, link, pictureUrl, isVisibleToAllUsers);

        return recipe;
    }

    const findRecipe = function (i) {
        cy.get('.tt-input').type(recipes[i].name + ", " + recipes[i].category);
        cy.get(".tt-dataset-recipes > div").click();
        cy.get('.tt-input').clear();

        cy.get('#outputHeader > :nth-child(1) > h5').should("have.text", recipes[i].name);
        cy.get('#outputHeader > :nth-child(2').should("have.text", "Category: " + recipes[i].category);
        cy.get("#outputHeader > div:nth-child(3) > a").should("have.attr", "href").should("include", recipes[i].link);
        cy.get("#outputHeader > div:nth-child(4) > img").should("have.attr", "src").should("include", recipes[i].pictureUrl);
    }

    const findRecipeShouldNotExist = function (i) {
        cy.get('.tt-input').type(recipes[i].name + ", " + recipes[i].category);
        cy.get(".tt-dataset-recipes > div").should("not.exist");
        cy.get('.tt-input').clear();
    }

    before("register first user and go to new recipe tab", () => {
        cy.registerRequest(firstUserCredentials.email, firstUserCredentials.password);
        cy.visit("/");
        mainMenu.newRecipeTab().click();
    })

    it("[KNOWN BUG] add 5 recipes not visible to all users", () => {
        for (let i = 0; i < recipesAmount; i++) {
            recipes[i] = createRecipe(false);
            cy.addRecipe(recipes[i]);
        }

        cy.visit("/");
        mainMenu.recipesTab().click();

        for (let i = 0; i < recipesAmount; i++) {
            findRecipe(i);
        }

        mainMenu.logOutTab().click();
        cy.registerRequest(secondUserCredentials.email, secondUserCredentials.password);
        cy.visit("/");
        mainMenu.recipesTab().click();

        //BUG - a user who is not the creator of the recipe can find it
        for (let i = 0; i < recipesAmount; i++) {
            findRecipeShouldNotExist(i)
        }

        mainMenu.logOutTab().click();
    })

    it("add 5 recipes visible to all users", () => {
        cy.loginRequest(firstUserCredentials.email, firstUserCredentials.password);
        cy.visit("/");
        mainMenu.newRecipeTab().click();

        for (let i = 0; i < recipesAmount; i++) {
            recipes[i] = createRecipe(true);
            cy.addRecipe(recipes[i]);
        }

        mainMenu.recipesTab().click();

        for (let i = 0; i < recipesAmount; i++) {
            findRecipe(i);
        }

        mainMenu.logOutTab().click();
        cy.loginRequest(secondUserCredentials.email, secondUserCredentials.password);
        cy.visit("/");
        mainMenu.recipesTab().click();

        for (let i = 0; i < recipesAmount; i++) {
            findRecipe(i);
        }
    })
})