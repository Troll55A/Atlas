const swaggerAutogen = require('swagger-autogen');

//Ruta de archivo de configuracion, que saldra
const outputFile = './swagger.json';
//Archivo de entrada donde se llamara a los endpoints
const endPointsFiles=['../src/models/server.js'];
//Documentacion del API REST
const doc = {
    info:{
        title:'API REST Cafeteria',
        description:'Esta API permite el manejo de una cafeteria'
    },
    host:'localhost:8080',
    //protocolo http, https
    Schemas:['http']
}

swaggerAutogen()(outputFile, endPointsFiles, doc);
