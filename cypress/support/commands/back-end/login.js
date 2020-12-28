Cypress.Commands.add("loginRequest", function(email, password) {
    cy.request({
      method: "POST",
      url: "/login",
      form: true,
      followRedirect: false,
      body: { username: email, password: password }
    });
  });
  