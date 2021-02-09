import * as LTE from "../../../webElements/listsPage";

Cypress.Commands.add("addNewList", function (name) {
    LTE.addNewListInputField().type(name).then(() => {
        LTE.addNewListButton().click();
    })
})

Cypress.Commands.add("deleteList", function (name) {
    LTE.listSelect().select(name);
    LTE.deleteListButton().click();
})
