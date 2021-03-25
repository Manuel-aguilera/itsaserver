import express from 'express';
import morgan from 'morgan';
import cors from 'cors'; 
import * as Routes from './routes/index';
import config from './config';
import bodyParser from 'body-parser';

const app = express();

//Settings
app.set('port', config.PORT);
console.log(`Server on port: ${config.PORT}`);

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json({limit:'5mb'})); 
app.use(bodyParser.urlencoded({extended:true, limit:'5mb'}));
// app.use(express.json());
// app.use(express.urlencoded({extended: false}));

//Routes
app.get('/', (req, res) => {
    res.json({message: 'API V1 ITSA'})
})
app.use('/api/v1/tasks', Routes.taskRoutes)
app.use('/api/v1/users', Routes.userRoutes)
app.use('/api/v1/temporaryusers', Routes.temporaryUserRoutes)
app.use('/api/v1/tipopagos', Routes.tipoPagoRoutes)
app.use('/api/v1/periodos', Routes.periodoRoutes)
app.use('/api/v1/documentos', Routes.documentoRoutes)
app.use('/api/v1/descargas', Routes.descargasRoutes)
app.use('/api/v1/depositosbancarios', Routes.depositosbancarioRoutes)
app.use('/api/v1/carreras', Routes.carreraRoutes)

export default app;