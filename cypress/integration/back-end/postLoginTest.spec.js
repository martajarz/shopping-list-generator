import * as randomData from "../../support/generators/randomData";

describe("POST /login test", () => {

    it("register user and then log in by request", () => {
        const credentials = randomData.getRandomCredentials();
        cy.registerRequest(credentials.email, credentials.password);

        cy.loginRequest(credentials.email, credentials.password)
            .then((resp) => {
                cy.checkResponseCodeAndRedirectUrl(resp, 302, "/lists");
                cy.getCookie("session").should("exist");
            })
    })
})



