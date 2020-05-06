const fs = require('fs');
const path = require('path');
const { fetch } = require('cross-fetch');
const gql = require('graphql-tag');
const { execute, makePromise } = require('apollo-link')
const { createHttpLink } = require('apollo-link-http')

const hasuraUri = process.env.HASURA_URI || 'http://localhost:8090';
const allowedSdl = path.resolve(__dirname, 'operations', 'allowed.graphql');
const disallowedSdl = path.resolve(__dirname, 'operations', 'disallowed.graphql');

async function loadQueryNode (filePath) {
  return gql`${await fs.promises.readFile(filePath)}`
}

function print(result) {
  console.log(JSON.stringify(result, null, 2))
}

async function runBothQueries() {
    const httpLink = createHttpLink({
        uri: `${hasuraUri}/v1/graphql`,
        fetch
    })
    try {
        print(await makePromise(execute(httpLink, {
            query: await loadQueryNode(allowedSdl)
        })))
        print(await makePromise(execute(httpLink, {
            query: await loadQueryNode(disallowedSdl)
        })))
    } catch (error) {
        console.error(error)
    }
}

runBothQueries()