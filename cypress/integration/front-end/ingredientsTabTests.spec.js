import { internet } from "faker";
import * as RD from "../../support/generators/randomData";
import * as MME from "../../webElements/mainMenuElements";
import * as ITE from "../../webElements/ingredientsTabElements";
import * as LTE from "../../webElements/listsTabElements";

describe("check functionality of Ingredients tab", () => {

    const credentials = RD.getRandomCredentials();
    const listName = RD.generateRandomString();
    const units = ["teaspoon", "tablespoon", "item", "package", "cup", "ml", "dl", "l", "pound", "ounce", "mg", "g", "kg"];
    let ingredients = [];
    let measures = [];

    const fillNameAndMeasureField = function (ingredientName, measure) {
        ITE.nameCategoryInputField().type(ingredientName);
        ITE.measureInputField().type(measure);
    }

    const selectUnitAndListThenClickSubmit = function (unit, listName) {
        ITE.unitSelectLocator().select(unit);
        ITE.listSelectLocator().select(listName);
        cy.get('.btn').click();
    }

    before("register user", () => {
        cy.registerRequest(credentials.email, credentials.password);
        cy.addListRequest(listName);
        cy.visit("/");
        MME.ingredientsTab().click();
    })

    it("add 13 ingredients to list", () => {
        for (let i = 0; i < 5; i++) {
            const ingredientName = RD.generateRandomString().slice(0, 5) + ", " + RD.generateRandomString().slice(0, 5);
            ingredients[i] = ingredientName;

            if (i < 3) {
                measures[i] = i + 1;
                fillNameAndMeasureField(ingredientName, measures[i]);
                selectUnitAndListThenClickSubmit(units[i], listName);
            }

            if (i > 3 && i < 8) {
                fillNameAndMeasureField(ingredientName, measures[i]);

                for (let j = i; j > 0; i--) {
                    ITE.measureInputField().type("{uparrow}");
                }
                selectUnitAndListThenClickSubmit(units[i], listName);
            }

            else {
                fillNameAndMeasureField(ingredientName, measures[i]);

                for (let j = i; j > 0; i--) {
                    ITE.measureInputField().type("{downarrow}");
                }
                selectUnitAndListThenClickSubmit(units[i], listName);
            }
        }
    })

    it("check if ingredients are in list with proper amount and unit", () => {
        cy.loginRequest(credentials.email, credentials.password);
        cy.visit("/lists");
        LTE.listSelect().select(listName);

        for (let i = 0; i < 5; i++) {
            cy.get("tbody > :nth-child(" + (i + 1) + ")> :nth-child(2)").contains(ingredients[i]);
            cy.get("tbody > :nth-child(" + (i + 1) + ")> :nth-child(3)").contains(measures[i]);
            cy.get("tbody > :nth-child(" + (i + 1) + ")> :nth-child(4)").contains(units[i]);
        }
    })
})