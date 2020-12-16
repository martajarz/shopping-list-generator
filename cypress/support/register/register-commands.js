Cypress.Commands.add("registerUser", function(email, password) {
  cy.request({
    method: "POST",
    url: "/register",
    form: true,
    followRedirect: false,
    body: { username: email, password: password }
  });
});
