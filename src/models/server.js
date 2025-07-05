const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerDocumentation = require('../../docs/swagger.json')
const { dbConnection } = require('../../database/config');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.docPath = '/api/doc';
        this.middlewares();
        this.routes();
        //CONECTAR A BD
        this.conectarDB();
    }

    middlewares() {
         //para uso de la peticion http:POST,PUT,Patch
        this.app.use(express.json());
        //se publica la carpeta public para contenido estatico
        this.app.use(express.static('public'));
        //CORS de esta manera acceden a todas las paginas
        this.app.use(cors());
        //Se coloca la documentacion
        this.app.use(this.docPath, swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
    }

    routes() {
        //Ruta extendida
        this.app.use('/api/users',require('../routes/userRoute'))
        this.app.use('/api/auth',require('../routes/authRoute.'))
    }

    async conectarDB() {
         await dbConnection();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);

        })
    }

}
module.exports=Server;