const { complete } = require('./utils')
const escape = val => JSON.stringify(val).slice(1, -1)

module.exports = {
    prompts: {
        name: {
            type: 'string',
            message: 'Project name (internal usage for dev)',
            validate: val => val && val.length > 0
        },

        productName: {
            type: 'string',
            message: 'Project product name (must start with letter if building mobile apps)',
            default: 'HST Cloud Server',
            validate: val => val && val.length > 0,
            transformer: escape
        },

        description: {
            type: 'string',
            message: 'Project description',
            default: 'A HST Cloud Framework Server',
            transformer: escape
        },

        author: {
            type: 'string',
            message: 'Author'
        },

        hstcloud: {
            type: 'list',
            message: 'Connect to HST Cloud project:',
            choices: [
                {
                    name: 'New HST Cloud Project',
                    value: 'new',
                },
                {
                    name: 'Existing Project',
                    value: 'existing',
                }
            ]
        },

        port: {
            type: 'number',
            message: 'Server port',
            default: 4020,
            validate: val => val && val > 0
        },

        isdatastore: {
            type: 'list',
            message: 'Use to datastore:',
            choices: [
                {
                    name: 'Yes, use datastore',
                    value: true,
                },
                {
                    name: 'No, not use datastore',
                    value: false,
                }
            ]
        },

        datastore: {
            when : "isdatastore",
            type: 'list',
            message: 'Connect to datastore:',
            choices: [
                {
                    name: 'MYSQL',
                    value: 'mysql',
                },
                {
                    name: 'MSSQL',
                    value: 'ms',
                },
                {
                    name: 'Local Disk',
                    value: 'local',
                }
            ]
        },

        datastorehost: {
            when: 'isdatastore',
            type: 'string',
            message: 'Datastore host:',
            default: "localhost"
        },

        datastoreport: {
            when: 'isdatastore',
            type: 'number',
            message: 'Datastore port:',
            default: 3306
        },

        username: {
            when: 'isdatastore',
            type: 'string',
            message: 'Datastore user name:',
            default: "root"
        },

        password: {
            when: 'isdatastore',
            type: 'string',
            message: 'Datastore password:',
            default: ""
        },

        datastoretable: {
            when: 'isdatastore',
            type: 'string',
            message: 'Datastore table:',
            validate: val => val && val.length > 0
        }
    },

    filters: {


    },



    complete
};