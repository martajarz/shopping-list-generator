import * as RD from "../../support/generators/randomData";
import * as MME from "../../webElements/mainMenuElements";
import * as ITE from "../../webElements/ingredientsTabElements";
import * as LTE from "../../webElements/listsTabElements";

describe("check functionality of adding ingredients", () => {
    const credentials = RD.getRandomCredentials();
    const ingredients = [];
    const measures = [];
    const units = [];
    const listName = RD.generateRandomString();

    before("register user", () => {
        cy.registerRequest(credentials.email, credentials.password);
        cy.addListRequest(listName);
        cy.visit("/");
        MME.ingredientsTab().click();
    })

    it("add one ingredient per unit", () => {
        cy.loginRequest(credentials.email, credentials.password);
        cy.visit("/ingredients");

        for (let i = 0; i < 13; i++) {
            cy.get("[data-cy=ingredientUnitSelect] > option:nth-child(" + (i + 2) + ")").invoke("text").then(text => {
                units[i] = text;
            });
        }

        for (let i = 0; i < units.length; i++) {
            const ingredientName = RD.generateRandomString().slice(0, 6) + ", " + RD.generateRandomString().slice(0, 6);
            ingredients[i] = ingredientName;
            measures[i] = i + 1;

            ITE.nameCategoryInputField().type(ingredientName);
            ITE.measureInputField().type(measures[i]);
            ITE.unitSelectLocator().select(units[i]);
            ITE.listSelectLocator().select(listName);
            cy.get("[data-cy=ingredientSubmitButton]").click();
        }
    })

    it("check if ingredients are in the list with proper amount and unit", () => {
        cy.loginRequest(credentials.email, credentials.password);
        cy.visit("/lists");
        LTE.listSelect().select(listName);

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