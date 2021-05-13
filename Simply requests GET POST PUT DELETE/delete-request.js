/// <reference types='cypress' /> 

describe('DELETE Request', () => {

    it('Delete a post  /post API', () => {
        cy.request({
            method: "DELETE",
            url: '/posts/7'
       
        }).then(response => {
            expect(response.status).to.eql(200)
        })
    })
})  