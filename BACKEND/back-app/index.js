import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import conn from './Config/db.js';
import dotenv from 'dotenv'
dotenv.config();

import fs from 'fs'
import path from 'path'
import Client from './Model/clientModel.js';
import Project from './Model/projectModel.js'

conn();

const resolvers = {
    Query: {
        clients: async () => Client.find(),
        findClient: async (root, args) => {
            return Client.findById(args.id)
        },
        projects: async () => {
            return Project.find()
        },
        findProject: async (root, args) => {
            return Project.findById(args.id)
        }
    },
    Project: {
        client: async (root, args) => {
            return Client.findById(root.clientId)
        },

    },
    Mutation: {
        addClient: async (root, args) => {
            const newClient = new Client({ ...args });
            await newClient.save()
            return newClient
        },
        deleteClient: async (root, args) => {
            return Client.findByIdAndRemove(args.id)
        },
        addProject: async (root, args) => {
            const newProject = new Project({ ...args });
            await newProject.save()
            return newProject
        },
        deleteProject: async (root, args) => {
            return Project.findByIdAndRemove(args.id)
        },
        updateProject: async (root, args) => {
            return Project.findByIdAndUpdate(args.id, {
                $set: {
                    name: args.name,
                    description: args.description,
                    status: args.status
                }
            }, {new: true})
        }
        
    }
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join("Graphql", "schema.graphql"), "utf-8"),
    resolvers
})

startStandaloneServer(server, {
    listen: {
        port: process.env.PORT 
    }
}).then((res) => console.log(`Server running on port ${res.url}`))