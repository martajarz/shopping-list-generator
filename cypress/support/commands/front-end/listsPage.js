import * as LTE from "../../../webElements/listsTabElements";

Cypress.Commands.add("addNewList", function (name) {
    LTE.addNewListInputField().type(name).then(() => {
        LTE.addNewListButton().click();
    })
})

Cypress.Commands.add("deleteList", function (name) {
    LTE.listSelect().select(name);
    cy.get('.input-group-append > .btn').click();
})
