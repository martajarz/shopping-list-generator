import * as RD from  "../../support/generators/randomData";

describe("post /login test", () => {

    it("post request register and then login user successfully", () => {
        const credentials = RD.getRandomCredentials();
        cy.registerRequest(credentials.email, credentials.password)
            .then((resp) => {
                cy.checkResponseCodeAndRedirectUrl(resp, 302, "/lists");
                cy.getCookie("session").should("exist");

                cy.loginRequest(credentials.email, credentials.password)
                    .then((resp) => {
                        cy.checkResponseCodeAndRedirectUrl(resp, 302, "/lists");
                        cy.getCookie("session").should("exist");
                    })
            })
    })
})


