describe("check functionality of Lists tab", () => {

    before("register to shopping list generator", () => {
        cy.getRandomCredentials()
            .then(value => {
                cy.postRegister(value.randomEmailAddress, value.randomPassword);
                cy.visit("/");
                cy.get(Cypress.env("listsTab")).click();
            })
    })

    it("add 10 lists", () => {
        for(let i = 0; i < 10; i++){
            cy.generateRandomString()
            .then(value => {
                cy.get("[data-cy=addNewListInput]").type(value);
                cy.get("[data-cy=addNewListButton]").click();
                cy.get("[data-cy=listSelect]").select(value).should("have.value", value);
            })
        }
    })    

})