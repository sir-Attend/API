/// <reference types='cypress' /> 

describe('POST, GET, DELETE requests', () => {

    let comments = new Array();
    let randomComment = Math.random().toString(36).substring(1) + Math.random().toString(36).substring(1);
    let randomPostId = Math.floor(Math.random() * 1000 +1)

    it('Create a new comment', () => {
        cy.request({
            method: "POST",
            url: '/comments',
            body: {
                body: randomComment,
                postId: randomPostId
            }
        }).then(response => {
            expect(response.status).to.eql(201)
        })
    })

    it('Locate and assert latest comment', () => {
        cy.request({
            method: "GET",
            url: '/comments',
            headers: {
                accept: 'application/json'
            }
    }).then(response => {
        let body = JSON.parse(JSON.stringify(response.body))
        body.forEach(item => {
            comments.push(item['body'])
            
        })
    }).then( () => {
        let LatestComment = comments[comments.length -1]
        expect(LatestComment).to.eql(randomComment)
        
    })
 })
    it('Delete all our new comments', () => {

        cy.request({
              method: "DELETE",
              url: '/comments/' + comments.length
            }).then(response => {
                 expect(response.status).to.eql(200)
            })
    })
})  

