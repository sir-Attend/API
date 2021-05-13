/// <reference types='cypress' /> 

describe('UPDATE Request', () => {

    let titleOfPosts = new Array();

    it('Update an existing via the /post API', () => {
        cy.request({
            method: "PUT",
            url: '/posts/2',
            body: {
                title: "Where is Sarah? asked John",
                author: 'Sarah Jones de Canterville'
            }
        }).then(response => {
            expect(response.status).to.eql(200)
        })
    })

    it('Validate title of latest post', () => {
        cy.request({
            method: "GET",
            url: '/posts',
            headers: {
                accept: 'application/json'
            }
    }).then(response => {
        let body = JSON.parse(JSON.stringify(response.body))
        body.forEach(item => {
            titleOfPosts.push(item['title'])
            
        });
    }).then( () => {
        let LatestPost = titleOfPosts[titleOfPosts.length -4]
        expect(LatestPost).to.eql('Want to learn')
    })

 })
})  