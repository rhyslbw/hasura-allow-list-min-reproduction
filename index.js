const fs = require('fs');
const path = require('path');
const { fetch } = require('cross-fetch');
const gql = require('graphql-tag');
const { execute, makePromise } = require('apollo-link')
const { createHttpLink } = require('apollo-link-http')

const hasuraUri = process.env.HASURA_URI || 'http://localhost:8090';
const allowed = path.resolve(__dirname, 'operations', 'allowed.graphql');
const disallowed = path.resolve(__dirname, 'operations', 'disallowed.graphql');

async function executeQuery (filePath) {
    const link = createHttpLink({
        uri: `${hasuraUri}/v1/graphql`,
        fetch
    });
    const result = await makePromise(execute(link, {
        query: gql`${await fs.promises.readFile(filePath)}`
    }));
    console.log(JSON.stringify(result, null, 2))
}

executeQuery(allowed)
    .then(() => executeQuery(disallowed))
    .catch(error => console.error(error))

