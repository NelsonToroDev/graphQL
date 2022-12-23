'use strict'
const Handlebars = require("handlebars")
const { request } = require('graphql-request');
const endPoint = 'http://localhost:3000/api'

const template = `
{{#with error}}
    There was an error: {{../error}}
{{/with}}
{{#each items}}
<div class="resultCard">
    <h2 class="card-header">{{__typename}}</h2>
    <div class="card-body">
        <h3 class="card-title">{{title}}{{name}}</h3>
        {{#with description}}
            <p class="card-text">{{../description}}</p>
        {{/with}}
        {{#with avatar}}
        <p class="card-text"><a href="img:{{../avatar}}">{{../avatar}}</a></p>
        {{/with}}
        {{#with phone}}
        <p class="card-text"><a href="tel:{{../phone}}">{{../phone}}</a></p>
        {{/with}}
    </div>
</div>
{{/each}}
`
const templateData = Handlebars.compile(template)

async function search () {
    const query = `
        query generalSearch ($keyword: String!){
            searchItems(keyword: $keyword){
                __typename
                    ... on Course{
                        title
                        description
                    }
                    ... on Monitor{
                        name
                        phone
                    }
                    ... on Student{
                        name
                        avatar
                    }
            }
        }
    `
    const dataToSearch = { keyword: document.getElementById('search').value }
    let result, html
    try {
        result = await request(endPoint, query, dataToSearch)
        html = templateData({ items: result.searchItems })
    } catch (error) {
        html = templateData({ error: error })
    }

    document.getElementById('result').innerHTML = html
}

window.onload = () => {
    document.getElementById('btn-search').addEventListener("click", search);
}