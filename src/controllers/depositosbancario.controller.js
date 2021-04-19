import DepositosBancario, { ESTADOPAGO } from '../models/DepositosBancario';
import TemporaryUser from '../models/TemporaryUser';
import Documento from '../models/Documento';
import TipoPago from '../models/TipoPago';
import User from '../models/User';
import Periodo from '../models/Periodo';
import upload from '../middleware/uploadDepositos';

// ["revisión", "aceptado", "rechazado", "finalizado", "cancelado"];

//movil

export const findAllDepositosBancarioAlumno = async (req, res) => {
    if(!req.params)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "No has ingresado el id del user"
        })
    const { id } = req.params;
    try{
        const depositosBancario = await DepositosBancario.find({id_user: id}).sort({createdAt: -1});
        if(depositosBancario.length < 1) 
            return res.status(404).json({
                data: [],
                status: "notfound",
                message: `La DepositosBancario con el id: ${id} no existe`
            })

        res.json({
            data: depositosBancario,
            status: "success",
            message: `Los depositos bancarios fueron encontrados`
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error devolviendo la DepositosBancario con el id: ${id}`,
        });
    }
}

export const createAlumnoDepositosBancario = async (req, res) => {
    try{
        if(!req.body)
        res.status(404).json({
            data: [],
              status: "failed",
            message: "Debes ingresar los datos del DepositosBancario"
        })
        const { id_user } = req.body;

        //suponiendo que en el panel del front solicitamos una data compuesta con el usuarytemporary y sus docs
        //  entonces mediante esta ruta creamos el deposito bancario para que esté disponible en la app móvil del cliente
        //Haremos la simulacion de la data compuesta para el panel personalizado y llamaremos este metodo para crearlo
        const user = await User.findById(id_user);
        //extraemos el ultimo periodo, ya existe una ruta llamada periodos/ultimo pero aqui ponemos la logica ya que estamos simulando
        const periodo = await Periodo.find({},{_id: 0}).sort({"periodo":-1});
        const listaPeriodos = Object.entries(periodo);
        let ultimoPeriodo = listaPeriodos[0][1].periodo;

        let folioPago = getFolioPago();
        let rf = await getReferenciaBancariaAlumno(user); 
        let referenciaBancaria = `${rf}${folioPago}`;
        const newDepositosBancario = new DepositosBancario({
            id_user: id_user,
            usuario: user.datosAlumno.usuario,
            tipoPago: req.body.tipoPago,
            concepto: req.body.concepto,
            cantidad: req.body.cantidad,
            costo: req.body.costo,
            importe: req.body.importe,
            NControlCurp: user.datosAlumno.curp,
            folioInterno: folioPago,
            convenioCIE: req.body.convenioCIE,
            referenciaBancaria: referenciaBancaria,
            periodo: ultimoPeriodo, 
            estadoPago: req.body.estadoPago,
            fotoDeposito: null,
            fecha: `${new Date(Date.now())}`,
            fechaCaducidad: `${new Date(Date.now())}`, //falta indicar la expiracion
            observaciones: req.body.observaciones, 
        });
        const depositosBancarioSave = await newDepositosBancario.save();
        res.json({
            data: depositosBancarioSave,
            status: "success",
            message: "DepositosBancario creada exitosamente"
        })
    }
    catch(error){
        res.status(500).json({
            data: [],
            status: "failed",
            message: error.message || "Algo ocurrió mal mientras creabamos la DepositosBancario",
        });
    }
}

export const findNoProcesadoDepositosBancario = async (req, res) => {
    if(!req.params)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "No has ingresado el id de la DepositosBancario"
        })
    const { id } = req.params;
    try{
        const depositosBancario = await DepositosBancario.find({id_user: id, procesado: false});
        if(depositosBancario.length < 1) 
            return res.status(404).json({
                data: [],
                status: "notfound",
                message: `La DepositosBancario con el id: ${id} no existe`
            })

        res.json({
            data: depositosBancario,
            status: "success",
            message: `Los depositos bancarios fueron encontrados`
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error devolviendo la DepositosBancario con el id: ${id}`,
        });
    }
}

export const findNotPaidDepositosBancario = async (req, res) => {
    if(!req.params)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "No has ingresado el id de la DepositosBancario"
        })
    const { id } = req.params;
    try{
        const depositosBancario = await DepositosBancario.find({id_user: id, pagado: false});
        if(depositosBancario.length < 1) 
            return res.status(404).json({
                data: [],
                status: "notfound",
                message: `La DepositosBancario con el id: ${id} no existe`
            })

        res.json({
            data: depositosBancario,
            status: "success",
            message: `Los depositos bancarios no pagados fueron encontrados`
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error devolviendo la DepositosBancario con el id: ${id}`,
        });
    }
}

export const findUltimoDepositosBancario = async (req, res) => {
    try{
        const depositosBancario = await DepositosBancario.find({},{_id: 0}).sort({"createdAt":-1});

            if(!depositosBancario) return res.status(404).json({
            data: [],
            status: "notfound",
            message: `La DepositosBancario con el id: ${id} no existe`
        })

        res.json({
            data: depositosBancario,
            status: "success",
            message: `El DepositosBancario fue encontrado`
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error devolviendo la DepositosBancario con el id: ${id}`,
        });
    }
}

export const updateDepositosBancario = async (req, res) => {
    try{
        await upload(req, res);
        if(req.files.length < 1) {
            return res.status(404).json({
                data: [],
                status: 'failed',
                message: 'Deberás enviar al menos una imagen',
            });
        }
        if(!req.query)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "No has ingresado el id del deposito bancario a actualizar"
        })  
        const { id } = req.query;
        const { procesado } = req.query;
        const depositos = await DepositosBancario.find({id_user: id});
        const idsDepositos = Object.entries(depositos).map((doc) => doc[1]._id);

        let updatedDeposito = [];
        idsDepositos.forEach(async (id, index) => {
            let file = req.files[index];
            console.log(file)
            if(isFicha(file) || isAportacion(file)){
                const deposito = await DepositosBancario.findByIdAndUpdate(id, {
                    fotoDeposito: {
                        image: {
                            originalname: isFicha(file) ? getFicha(req.files).originalname : getAportacion(req.files).originalname,
                            filename: isFicha(file) ? getFicha(req.files).filename : getAportacion(req.files).filename,
                            path: isFicha(file) ? getFicha(req.files).path : getAportacion(req.files).path,
                        }
                    },
                    procesado: procesado,
                }, {
                    useFindAndModify: false
                });
                updatedDeposito.push(deposito);
            }
            else {
                res.json({
                    data: [],
                    status: 'failed',
                    message: 'No enviaste las dos fotos o los nombres son incorrectos',
                })    
            }
        });
        
        res.json({
            data: updatedDeposito,
            status: 'success',
            message: 'Deposito Bancario actualizado con éxito',
        })
    }
    catch(error){
        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(404).json({
                data: [],
                status: 'failed',
                message: 'Demasiados archivos han sido enviados',
            });
        }
        res.status(500).json({
            data: [],
            status: 'failed',
            message: error.message || `Error actualizando el Deposito bancario con el id: ${id}`,
        });
    }
}

//web

export const findAllDepositosBancarios = async (req, res) => {
    try{
        const data = await DepositosBancario.find().sort({createdAt: -1});
        
        res.json({
            data: data,
            status: "success",
            message: "Datos de las DepositosBancarios"
        });
    }
    catch(error){
        res.status(500).json({
            data: [],
            status: "failed",
            message: error.message || "Algo ocurrió mal mientras devolviamos las DepositosBancarios",
        });
    }
}

export const createDepositosBancario = async (req, res) => {
    try{
        if(!req.body)
        res.status(404).json({
            data: [],
              status: "failed",
            message: "Debes ingresar los datos del DepositosBancario"
        })
        const { id_user } = req.body;

        //suponiendo que en el panel del front solicitamos una data compuesta con el usuarytemporary y sus docs
        //  entonces mediante esta ruta creamos el deposito bancario para que esté disponible en la app móvil del cliente
        //Haremos la simulacion de la data compuesta para el panel personalizado y llamaremos este metodo para crearlo
        const temporaryUser = await TemporaryUser.findById(id_user);
        const documento = await Documento.findOne({id_user: id_user})
        //extraemos el ultimo periodo, ya existe una ruta llamada periodos/ultimo pero aqui ponemos la logica ya que estamos simulando
        const periodo = await Periodo.find({},{_id: 0}).sort({"periodo":-1});
        const listaPeriodos = Object.entries(periodo);
        let ultimoPeriodo = listaPeriodos[0][1].periodo;

        let folioPago = getFolioPago();
        let rf = await getReferenciaBancaria(); 
        let referenciaBancaria = `${rf}${folioPago}`;

        const newDepositosBancario = new DepositosBancario({
            id_user: id_user,
            usuario: temporaryUser.usuario,
            tipoPago: req.body.tipoPago,
            concepto: req.body.concepto,
            cantidad: req.body.cantidad,
            costo: req.body.costo,
            importe: req.body.importe,
            NControlCurp: temporaryUser.curp,
            folioInterno: folioPago,
            convenioCIE: req.body.convenioCIE,
            referenciaBancaria: referenciaBancaria,
            periodo: ultimoPeriodo,
            estadoPago: req.body.estadoPago,
            fotoDeposito: null,
            fecha: `${new Date(Date.now())}`,
            fechaCaducidad: `${new Date(Date.now())}`,
            observaciones: req.body.observaciones, 
        });
        const depositosBancarioSave = await newDepositosBancario.save();
        res.json({
            data: depositosBancarioSave,
            status: "success",
            message: "DepositosBancario creada exitosamente"
        })
    }
    catch(error){
        res.status(500).json({
            data: [],
            status: "failed",
            message: error.message || "Algo ocurrió mal mientras creabamos la DepositosBancario",
        });
    }
}

export const updateProcesadoDepositosBancario = async (req, res) => {
    try{
        if(!req.params){
            res.json({
                data: [],
                status: "failed",
                message: "Necesitas ingresar el id del deposito bancario"
            });    
        }
        if(!req.body){
            res.json({
                data: [],
                status: "failed",
                message: "Necesitas enviar datos para actualizar el deposito bancario"
            });    
        }
        const { id } = req.params;
        const data = await DepositosBancario.findByIdAndUpdate(id,{
            procesado: req.body.procesado,
        }, {
            useFindAndModify: false
        });
        
        res.json({
            data: data,
            status: "success",
            message: "DepositosBancarios actualizado exitosamente"
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras devolviamos las DepositosBancarios",
        });
    }
}

export const updateEstadoPagoDepositosBancario = async (req, res) => {
    try{
        if(!req.params)
            res.status(404).json({
                data: [],
                status: "failed",
                message: "No has ingresado el _id del DepositosBancario"
            })
        if(!req.body)
            res.status(404).json({
                data: [],
                status: "failed",
                message: "No has ingresado el valor para estadoPago"
            })
        const { id } = req.params;
        const dataDepositosBancario = await DepositosBancario.findByIdAndUpdate(id, {
            estadoPago: req.body.estadoPago,  
        }, {
            useFindAndModify: false
        });
        res.json({
            data: dataDepositosBancario,
            status: 'success',
            message: 'La DepositosBancario actualizada exitosamente',
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error actualizada la DepositosBancario con el id: ${id}`,
        });
    }
}

export const updatePagadoDepositosBancario = async (req, res) => {
    try{
        if(!req.params)
            res.status(404).json({
                data: [],
                status: "failed",
                message: "No has ingresado el _id del DepositosBancario"
            })
        if(!req.body)
            res.status(404).json({
                data: [],
                status: "failed",
                message: "No has ingresado el valor para pagado"
            })
        const { id } = req.params;
        const dataDepositosBancario = await DepositosBancario.findByIdAndUpdate(id, {
            pagado: req.body.pagado,  
        }, {
            useFindAndModify: false
        });
        res.json({
            data: dataDepositosBancario,
            status: 'success',
            message: 'La DepositosBancario fue actualizada exitosamente',
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error actualizada la DepositosBancario con el id: ${id}`,
        });
    }
}

export const deleteDepositosBancario = async (req, res) => {
    if(!req.params)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "No has ingresado el _id del DepositosBancario temporaryuser"
        })
    const { id } = req.params;
    try{
        const dataDepositosBancario = await DepositosBancario.findByIdAndDelete(id)
        res.json({
            data: dataDepositosBancario,
            status: 'success',
            message: 'La DepositosBancario fue eliminada exitosamente',
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error eliminado la DepositosBancario con el id: ${id}`,
        });
    }
}

const getFolioPago = () => {
    return `${Date.now()}`;
}

const getReferenciaBancaria = async () => {
    let patron = await getPatron();
    return `N${patron}F`;
    // console.log(`A${matricula}F${Date.now()}`);
}

const getPatron = async () => {
    const date = new Date(Date.now());
    let year = `${date.getFullYear()}`;
    let anio = year.slice(2,4);
    const users = await User.find();
    let numSig = users.length + 1;
    let matricula = `${anio}02${zeroFill(numSig, 4)}`;
    return matricula;
}

const getReferenciaBancariaAlumno = async (user) => {
    let matricula = user.datosAlumno.matricula;
    return `A${matricula}F`;
}

const zeroFill = ( number, width ) => { // example zeroFill(324, 4)
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // siempre devuelve tipo cadena
}

const isFicha = (file) => {
    const isFicha = /fichaInscripcion/;
    return (isFicha.test(file.originalname)) ? true : false
}

const isAportacion = (file) => {
    const isAportacion = /aportacion/;
    return (isAportacion.test(file.originalname)) ? true : false
}

const getFicha = (files) => {
    const isFicha = /fichaInscripcion/;
    if(isFicha.test(files[0].originalname))
        return files[0]
    else if(isFicha.test(files[1].originalname))
        return files[1];
    console.log('ficha es vacio')
}

const getAportacion = (files) => {
    const isAportacion = /aportacion/;
    if(isAportacion.test(files[0].originalname))
        return files[0];
    else if(isAportacion.test(files[1].originalname))
        return files[1];
    console.log('aportacion es vacio')
}