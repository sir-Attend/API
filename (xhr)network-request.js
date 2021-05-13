/// <reference types='cypress' />

describe('XHR request', () => {

    let message = 'Put some text for our request'

    beforeEach('Going to the page with button',() => {
        cy.visit('https://example.cypress.io/commands/network-requests')
        // cy.server() // Start a server to begin routing responses to
    })

    it('GET Request', () => {
        // Listen to GET requests which use the following comments: whit the url
        cy.intercept('GET', '/comments/*').as('get_comment')

        cy.contains('Get Comment').click()
        cy.wait('@get_comment')
        cy.get('@get_comment').its('response.statusCode').should('eq', 200)

    })

     it('POST Request', () => {
        // Listen to Post requests which use the following comments: whit the url
        cy.intercept('POST', '**/comments').as('postComment')

        cy.contains('Post Comment').click()
        cy.wait('@postComment').should(xhr => {
            expect(xhr.request.body).to.include('name')
            expect(xhr.response.body).to.have.property('name', 'Using POST in cy.intercept()')
          })
    })

    it('PUT Request', () => {
        // Listen to PUT requests which use the following comments: whit the url
        cy.intercept({
            method: 'PUT',
            url: '**/comments/*',
        }, {
            statusCode: 404,
            body: { error: message },
            headers: { 'access-control-allow-origin': '*' },
             delayMs: 500,
        }).as('putComment')

        cy.contains('Update Comment').click()
        cy.wait('@putComment')
        cy.get('.network-put-comment').should('contain', message)
    })

    it('DELETE Request', () => {
        // Listen to DELETE requests which use the following comments: whit the url
        cy.intercept({
            method: 'PUT',
            url: '**/comments/*',
        }, {
            statusCode: 404,
            body: { error: message },
            headers: { 'access-control-allow-origin': '*' },
             delayMs: 500,
        }).as('putComment')

        cy.contains('Update Comment').click()
        cy.wait('@putComment')
        cy.get('.network-put-comment').should('contain', message)
    })
})
