import * as listsPage from "../../../webElements/listsPage";

Cypress.Commands.add("addNewList", function (name) {
    listsPage.addNewListInputField().type(name).then(() => {
        listsPage.addNewListButton().click();
    })
})

Cypress.Commands.add("deleteList", function (name) {
    listsPage.listSelect().select(name);
    listsPage.deleteListButton().click();
})
