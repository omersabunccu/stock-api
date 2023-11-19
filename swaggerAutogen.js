require('dotenv').config({path:'./config/.env'})
const PORT = process.env?.PORT || 8080
const HOST = process.env?.HOST || '127.0.0.1'

const swaggerAutogen = require('swagger-autogen')()
const packageJson = require('./package.json')

const documents ={
    info:{
        version: packageJson.version,
        title: packageJson.title,
        termsOfService: 'http://www.clarusway.com',
        contact:{
            name:packageJson.author, 
            email: 'john@clarusway.com'
        }, 
        license: {name: packageJson.license}
    }, 
    host: `${HOST}:${PORT}`, 
    basePath: '/',
    schemes:['http', 'https'],
    consumes:['application/json'], 
    produces: ['application/json'], 

    definition:{
        'User': require('./models/User').schema.obj,
        'Brand': require('./models/Brand').schema.obj,
        'Category': require('./models/Category').schema.obj,
        'Firm': require('./models/Firm').schema.obj,
        'Product': require('./models/Product').schema.obj,
        'Purchase': require('./models/Purchase').schema.obj,
        'Sale': require('./models/Sale').schema.obj,
    }
}


const routes = ['./index.js']
const outputFile = './config/swagger.json';
swaggerAutogen(outputFile, routes, documents)