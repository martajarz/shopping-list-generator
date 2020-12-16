import {
  generateRandomName,
  getRandomCredentials
} from "../../support/generators/randomData";
import * as LTE from "../../webElements/listsTabElements";
import * as NE from "../../webElements/navigationElements";

describe("check functionality of Lists tab", () => {
  before("register to shopping list generator", () => {
    const credentials = getRandomCredentials();
    cy.registerUser(credentials.email, credentials.password);
    cy.visit("/");
    NE.listsTab().click();
  });

  it("add 10 lists", () => {
    for (let i = 0; i < 10; i++) {
      const name = generateRandomName();
      LTE.addNewListInputField().type(name);
      LTE.addNewListButton().click();
      LTE.listSelect()
        .select(name)
        .should("have.value", name);
    }
  });
});
