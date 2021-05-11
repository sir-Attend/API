/// <reference types='cypress' /> 

describe('GET Request', () => {
    let result;
    it('Validate status code of the /post API', () => {
        result = cy.request('/posts')
        result.its('status').should('equal', 200)

    })

    it('Validate /post api contains the correct keys and values', () => {
        cy.request({
            method: "GET",
            url: '/posts',
            headers: {
                accept: 'application/json'
            }
        }).then(response => {
            let body = JSON.parse(JSON.stringify(response.body))
            cy.log(body)

            expect(body[0]).has.property('title', 'json-server')
            expect(body[1]).has.property('author', 'js')

            body.forEach( function(item) {
                expect(item).to.have.all.keys('id', 'title' ,'author')
                cy.log('Author: ' + item['author'] + ' Title: ' + item['title'])
            });

        })
    })
})