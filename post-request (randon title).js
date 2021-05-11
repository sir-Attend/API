/// <reference types='cypress' /> 

describe('POST Request', () => {

    let titleOfPosts = new Array();
    let randomTitle = Math.random().toString(36).substring(1) + Math.random().toString(36).substring(1);


    it('Create a nee post via /post API', () => {
        cy.request({
            method: "POST",
            url: '/posts',
            body: {
                title: randomTitle,
                author: 'Sarah Jones'
            }
        }).then(response => {
            expect(response.status).to.eql(201)
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
        let LatestPost = titleOfPosts[titleOfPosts.length -1]
        expect(LatestPost).to.eql(randomTitle)
    })

 })
})  