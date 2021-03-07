import * as randomData from "../../support/generators/randomData";

describe("POST /register test", () => {

    it("register user by request", () => {
        const credentials = randomData.getRandomCredentials();
        cy.registerRequest(credentials.email, credentials.password)
            .then((resp) => {
                cy.checkResponseCodeAndRedirectUrl(resp, 302, "/lists");
                cy.getCookie("session").should("exist");
            })
    })
})



