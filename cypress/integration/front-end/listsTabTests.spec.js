import * as randomData from "../../support/generators/randomData";
import * as listsPage from "../../webElements/listsPage";
import * as mainMenu from "../../webElements/mainMenu";

describe("test the functionality of Lists tab", () => {

    before("register to shopping list generator", () => {
        const credentials = randomData.getRandomCredentials();
        cy.registerRequest(credentials.email, credentials.password);
        cy.visit("/");
        mainMenu.listsTab().click();
    })

    let listsArray = [];

    it("add 10 lists", () => {
        for (let i = 0; i < 10; i++) {
            const name = randomData.generateRandomString();
            listsArray[i] = name;

            cy.addNewList(name);
            listsPage.listSelect()
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





