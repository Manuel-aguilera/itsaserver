import express from 'express';
import morgan from 'morgan';
import cors from 'cors'; 
import * as Routes from './routes/index';

const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.get('/', (req, res) => {
    res.json({message: 'API V1 ITSA'})
})
app.use('/api/v1/tasks', Routes.taskRoutes)
app.use('/api/v1/users', Routes.userRoutes)
app.use('/api/v1/temporaryusers', Routes.temporaryUserRoutes)
app.use('/api/v1/tipopagos', Routes.tipoPagoRoutes)
app.use('/api/v1/periodos', Routes.periodoRoutes)
// app.use('/api/v1/documentos', Routes.documentoRoutes)
app.use('/api/v1/depositosbancarios', Routes.depositosbancarioRoutes)
app.use('/api/v1/conveniocies', Routes.convenioCIERoutes)
app.use('/api/v1/conceptodocumentos', Routes.conceptoDocumentoRoutes)
app.use('/api/v1/carreras', Routes.carreraRoutes)

export default app;