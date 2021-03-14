import * as randomData from "../../support/generators/randomData";
import * as mainMenu from "../../webElements/mainMenu";
import * as ingredientsPage from "../../webElements/ingredientsPage";
import * as listsPage from "../../webElements/listsPage";

describe("test the functionality of adding ingredients", () => {
    const credentials = randomData.getRandomCredentials();
    const ingredients = [];
    const measures = [];
    const units = [];
    const listName = randomData.generateRandomString();

    before("register user and add list", () => {
        cy.registerRequest(credentials.email, credentials.password);
        cy.addListRequest(listName);
        cy.visit("/");
        mainMenu.ingredientsTab().click();
    })

    it("add units to the array, then add one ingredient per unit", () => {
        for (let i = 0; i < 13; i++) {
            cy.get("[data-cy=ingredientUnitSelect] > option:nth-child(" + (i + 2) + ")").invoke("text")
            .then(unit => {
                units[i] = unit;
            })
            .then(() => {
                for (let i = 0; i < units.length; i++) {
                    const ingredientName = randomData.generateRandomString().slice(0, 6) + ", " + randomData.generateRandomString().slice(0, 6);
                    ingredients[i] = ingredientName;
                    measures[i] = i + 1;

                    ingredientsPage.nameCategoryInput().type(ingredientName);
                    ingredientsPage.measureInput().type(measures[i]);
                    ingredientsPage.unitSelect().select(units[i]);
                    ingredientsPage.listSelect().select(listName);
                    ingredientsPage.submitButton().click();
                };
            })
        }
    })

    it("check if ingredients are in the list with proper amount and unit", () => {
        cy.loginRequest(credentials.email, credentials.password);
        cy.visit("/lists");
        listsPage.listSelect().select(listName);

        for (let i = 0; i < units.length; i++) {
            if (i <= 3) {
                cy.get("tbody > :nth-child(" + (i + 1) + ")> :nth-child(2)").contains(ingredients[i]);
                cy.get("tbody > :nth-child(" + (i + 1) + ")> :nth-child(3)").contains(measures[i]);
                cy.get("tbody > :nth-child(" + (i + 1) + ")> :nth-child(4)").contains(units[i]);
            }
            else {
                cy.get(":nth-child(" + (i + 1) + ")> :nth-child(2)").contains(ingredients[i]);
                cy.get(":nth-child(" + (i + 1) + ")> :nth-child(3)").contains(measures[i]);
                cy.get(":nth-child(" + (i + 1) + ")> :nth-child(4)").contains(units[i]);
            }
        }
    })
})
