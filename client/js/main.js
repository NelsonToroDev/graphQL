'use strict'
const Handlebars = require('handlebars')
const { request } = require('graphql-request')
const demoData = require('./demoData')
const endPoint = 'http://localhost:3000/api'

const template = `
{{#with error}}
    There was an error: {{../error}}
{{/with}}
{{#each items}}
<div class="col-sm-12 col-md-6 col-lg-4 mb-4">
    {{#with description}}
      <div
          class="card text-white card-has-bg click-col"
          style="    
              background-image: url('https://source.unsplash.com/600x900/?tree,nature');">
          <img
              class="card-img d-none"
              src="https://source.unsplash.com/600x900/?tree,nature"/>
          <div class="card-img-overlay d-flex flex-column">
            <div class="card-body">
                <small class="card-meta mb-2">{{../__typename}}</small>
                <h4 class="card-title mt-0">
                    <a class="text-white" herf="#">
                        {{../title}}{{../name}}
                    </a>
                </h4>
                <small> <i class="far fa-info"></i> {{../description}}</small>
            </div>
          </div>
      </div>
    {{/with}}
    {{#with avatar}}
      <div
          class="card text-white card-has-bg click-col"
          style="    
              background-image: url('https://source.unsplash.com/600x900/?computer,design');">
          <img
              class="card-img d-none"
              src="https://source.unsplash.com/600x900/?computer,design"
          />
          <div class="card-img-overlay d-flex flex-column">
              <div class="card-body">
                  <small class="card-meta mb-2">{{../__typename}}</small>
                  <h4 class="card-title mt-0">
                      <a class="text-white" herf="#">
                          {{../title}}{{../name}}
                      </a>
                  </h4>
                  <small> <i class="far fa-user"></i> {{../avatar}}</small>
              </div>
          </div>
      </div>
    {{/with}}
    {{#with phone}}
      <div
          class="card text-white card-has-bg click-col"
          style="    
              background-image: url('https://source.unsplash.com/600x900/?entropy');">
          <img
              class="card-img d-none"
              src="https://source.unsplash.com/600x900/?entropy"
          />
          <div class="card-img-overlay d-flex flex-column">
              <div class="card-body">
                  <small class="card-meta mb-2">{{../__typename}}</small>
                  <h4 class="card-title mt-0">
                      <a class="text-white" herf="#">
                        {{../title}}{{../name}}
                      </a>
                  </h4>
                  <small> <i class="far fa-phone"></i> {{../phone}}</small>
              </div>
          </div>
      </div>
    {{/with}}
</div>
{{/each}}
`
const templateData = Handlebars.compile(template)

async function search(useDemoData) {
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
    if (useDemoData) {
      console.log('useDemoData')
      console.log(demoData)
      html = templateData({ items: demoData.searchItems })
    } else {
      result = await request(endPoint, query, dataToSearch)
      console.log(result)
      html = templateData({ items: result.searchItems })
    }
  } catch (error) {
    console.error(error)
    html = templateData({ error: error })
  }

  document.getElementById('result').innerHTML = html
}

window.onload = () => {
  document
    .getElementById('btn-search')
    .addEventListener('click', () => search(false))
  document
    .getElementById('btn-demo-data')
    .addEventListener('click', () => search(true))
}
