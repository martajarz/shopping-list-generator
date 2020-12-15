describe("post /register test", () => {

    it("post request register user successfully", () => {
        cy.getRandomCredentials()
            .then(value => {
                cy.postRegister(value.randomEmailAddress, value.randomPassword)
                    .then((resp) => {
                        cy.checkResponseCodeAndRedirectUrl(resp, 302, "/lists");
                        cy.getCookie("session").should("exist");
                    })
            })
    })
})


