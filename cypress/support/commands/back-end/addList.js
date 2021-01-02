Cypress.Commands.add("addListRequest", function(name) {
    cy.request({
      method: "POST",
      url: "/lists",
      form: true,
      followRedirect: false,
      body: { listName: name }
    });
  });
  