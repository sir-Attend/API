/// <reference types="cypress" />

// describe('Test with backend', () => {

//     beforeEach('Login to the app', () => {
//         cy.SingIn()
//     })

//     it('Should logged in', () => {
//         cy.log('Yes, we can log in')
//     })
// })

describe('Test with backend', () => {

    beforeEach('Login to the app', () => {
        cy.SingIn()
    })

    it('Verify correct requeest and response', () => {

        cy.server()
        cy.route('POST', '**/articles').as('postArticles')

        cy.contains('New Article').click()
        cy.get('[formcontrolname="title"]').type('Some news')
        cy.get('[formcontrolname="description"]').type('Some news')
        cy.get('[formcontrolname="body"]').type('Some news')
        cy.get('[placeholder="Enter tags"]').type('Some news')
        cy.contains('Publish Article').click()

        cy.wait('@postArticles')
        cy.get('@postArticles').then (xhr => {
            console.log(xhr)
            expect(xhr.status).to.equal(200)
            expect(xhr.request.body.article.body).to.equal('Some news')
            expect(xhr.response.body.article.description).to.equal('Some news')
        })
    })

})
