import * as RD from "../../support/generators/randomData";

describe("post /register test", () => {

    it("post request register user successfully", () => {
        const credentials = RD.getRandomCredentials();
        cy.registerRequest(credentials.email, credentials.password)
            .then((resp) => {
                cy.checkResponseCodeAndRedirectUrl(resp, 302, "/lists");
                cy.getCookie("session").should("exist");
            })
    })
})



