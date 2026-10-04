import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';

async function init() {
    const app = express();
    const port = Number(process.env.PORT) || 8000;

    app.use(express.json());

    //create ApolloServer
    const gqlServer = new ApolloServer({
        typeDefs: `
        type Query {
            hello: String,
            sayHello(name: String): String,
        }`,
        resolvers: {
            Query: {
                hello: () => "My name is Soumya",
                sayHello: (_, { name }: { name: string }) => `Hello ${name}`
            }
        }
    })

    await gqlServer.start();
    app.get('/', (req, res) => {
        res.json({ message: 'Hello World!!!@@##' })
    })

    app.use("/graphql", expressMiddleware(gqlServer));

    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`)
    })
}

init();


