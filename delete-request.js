/// <reference types='cypress' /> 

describe('DELETE Request', () => {

    let titleOfPosts = new Array();

    it('Delete a post  /post API', () => {
        cy.request({
            method: "DELETE",
            url: '/posts/7'
       
        }).then(response => {
            expect(response.status).to.eql(200)
        })
    })
})  