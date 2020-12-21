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

    let listsArray = [];

    it("add 10 lists", () => {
        for (let i = 0; i < 10; i++) {
            const name = RD.generateRandomString();
            listsArray[i] = name;

            cy.addNewList(name);
            LTE.listSelect()
                .select(name)
                .should("have.value", name);
        }
    })

    it("delete 10 lists", () => {
        for (let i = 0; i < 10; i++) {
            cy.deleteList(listsArray[i]);

            cy.get("[data-cy=listSelect] > option").each(($option) => {
                expect($option).to.not.have.value(listsArray[i]);
            })
        }
    })
})





