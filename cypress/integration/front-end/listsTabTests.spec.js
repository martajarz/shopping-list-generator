import * as RD from "../../support/generators/randomData";
import * as LTE from "../../webElements/listsTabElements";
import * as MME from "../../webElements/mainMenuElements";

describe("check functionality of Lists tab", () => {

    before("register to shopping list generator", () => {
        const credentials = RD.getRandomCredentials();
        cy.registerRequest(credentials.email, credentials.password);
        cy.visit("/");
        MME.listsTab().click();
    })

    const listsArray = [];

    it("add 10 lists", () => {
        for (let i = 0; i < 3; i++) {
            const name = RD.generateRandomString();
            listsArray[i] = name;

            cy.addNewList(name);
            LTE.listSelect()
                .select(name)
                .should("have.value", name);
        }
        console.log(listsArray);
    })

    it("delete 10 lists", () => {
        for (let i = 0; i < 3; i++) {
        console.log(cy.get("#viewList"))

            //cy.deleteList(listsArray[i]);





        }
    })
})

