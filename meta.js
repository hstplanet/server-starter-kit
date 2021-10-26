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
            default : 4020,
            validate: val => val && val > 0
        },

        datastore: {
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

        datastoreport: {
            when: 'datastore.ms || datastore.mysql',
            type: 'number',
            message: 'Datastore port:',
            default : 3306
        },

        username: {
            when: 'datastore.ms || datastore.mysql',
            type: 'string',
            message: 'Datastore user name:',
            default : "root"
        },

        username: {
            when: 'datastore.ms || datastore.mysql',
            type: 'string',
            message: 'Datastore password:',
            default : ""
        },

        autoInstall: {
            type: 'list',
            message: 'Continue to install project dependencies after the project has been created? (recommended)',
            choices: [{
                    name: 'Yes, use Yarn (recommended)',
                    value: 'yarn',
                    short: 'yarn',
                },
                {
                    name: 'Yes, use NPM',
                    value: 'npm',
                    short: 'NPM',
                },
                {
                    name: 'No, I will handle that myself',
                    value: false,
                    short: 'no',
                }
            ]
        }
    },

    filters: {

  
    },



    complete
};