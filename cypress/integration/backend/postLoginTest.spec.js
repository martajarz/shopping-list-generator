describe("post /login test", () => {

    it("post request register and then login user successfully", () => {
        cy.getRandomCredentials().then(value => {

            cy.postRegister(value.randomEmailAddress, value.randomPassword).then((resp) => {
                    cy.checkResponseCodeAndRedirectUrl(resp, 302, "/lists");
                    cy.getCookie("session").should("exist");

                    cy.postLogin(value.randomEmailAddress, value.randomPassword).then((resp) => {
                            cy.checkResponseCodeAndRedirectUrl(resp, 302, "/lists");
                            cy.getCookie("session").should("exist");
                        })
                })
        })
    })

})

