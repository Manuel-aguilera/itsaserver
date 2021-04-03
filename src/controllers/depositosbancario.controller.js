import DepositosBancario from '../models/DepositosBancario';
import TemporaryUser from '../models/TemporaryUser';
import Documento from '../models/Documento';
import TipoPago from '../models/TipoPago';
import User from '../models/User';
import Periodo from '../models/Periodo';

export const findAllDepositosBancarios = async (req, res) => {
    try{
        const data = await DepositosBancario.find();
        
        res.json({
            data: data,
            status: "success",
            message: "Datos de las DepositosBancarios"
        });
    }
    catch(error){
        res.status(500).json({
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
        const { id } = req.body;
        console.log(id)

        //suponiendo que en el panel del front solicitamos una data compuesta con el usuarytemporary y sus docs
        //  entonces mediante esta ruta creamos el deposito bancario para que esté disponible en la app móvil del cliente
        //Haremos la simulacion de la data compuesta para el panel personalizado y llamaremos este metodo para crearlo
        const temporaryUser = await TemporaryUser.findById(id);
        const documento = await Documento.findOne({id_user: id})
        //extraemos el ultimo periodo, ya existe una ruta llamada periodos/ultimo pero aqui ponemos la logica ya que estamos simulando
        const periodo = await Periodo.find({},{_id: 0}).sort({"periodo":-1});
        const listaPeriodos = Object.entries(periodo);
        let ultimoPeriodo = listaPeriodos[0][1].periodo;

        //obtenemos el tipo de pago (luego ya que esto se usara en el front)
        // const tipoPago = await TipoPago.find();
        // //lo usamos para tipopagos 
        // const tipoPagos = Object.entries(tipoPago.data[0]);
        // tipoPagos.map((lista) => {
        //     console.log(lista[0]) //tipos
        //     console.log(lista[1]) //conceptos
        // })
        // let pago1 = 'fichas';
        // let concepto1 = 'FICHA DE ADMISIÓN ING. EN SISTEMAS COMPUTACIONALES';
        // Este para cuando haga el segundo deposito bancario
        // let pago2 = 'inscripcion';
        // let concepto2 = 'APORTACIÓN PARA EL FORTALECIMIENTO INSTITUCIONAL NUEVO INGRESO';
        
        let folioPago = getFolioPago();
        let rf = await getReferenciaBancaria(); 
        let referenciaBancaria = `${rf}${folioPago}`;

        const newDepositosBancario = new DepositosBancario({
            id_user: id,
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

export const findAvailableDepositosBancario = async (req, res) => {
    if(!req.params)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "No has ingresado el id de la DepositosBancario"
        })
    const { id } = req.params;
    try{
        const depositosBancario = await DepositosBancario.find({id_user: id, procesado: false});

        if(!depositosBancario) return res.status(404).json({
            data: [],
            status: "notfound",
            message: `La DepositosBancario con el id: ${id} no existe`
        })

        res.json({
            data: depositosBancario,
            status: "success",
            message: `La carreara fue encontrada`
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

export const updateDepositosBancario = async (req, res) => {
    try{
        await upload(req, res);
        if(req.files.length < 1) {
            return res.json({
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
        const depositoId = await DepositosBancario.findOne({id_user: id});
        const id_dep = depositoId._id; //es el id del DepositosBancario a actualizar
        let file1 = req.files[0];
        let file2 = req.files[1];
        let updatedDeposito = {};
        if(isFicha(file1) && isAportacion(file2)){
            console.log(`entra a ficha y aportacion: actualizamos el deposito bancario con id: ${id_dep}`);
            updatedDeposito = await DepositosBancario.findByIdAndUpdate(id_dep, {
                fotoFicha: {
                    image: {
                        originalname: getFicha(req.files).originalname,
                        filename: getFicha(req.files).filename,
                        path: getFicha(req.files).path,
                    }
                },
                fotoAportacion: {
                    image: {
                        originalname: getAportacion(req.files).originalname,
                        filename: getAportacion(req.files).filename,
                        path: getAportacion(req.files).path,
                    }
                },     
            }, {
                useFindAndModify: false
            });
        }
        else {
            res.json({
                data: [],
                status: 'failed',
                message: 'No enviaste las dos fotos o los nombres son incorrectos',
            })    
        }
        
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

const getFolioPago = () => {
    return `${Date.now()}`;
}

const getReferenciaBancaria = async () => {
    let matricula = await getMatricula();
    return `A${matricula}F`;
    // console.log(`A${matricula}F${Date.now()}`);
}

const getMatricula = async () => {
    const date = new Date(Date.now());
    let year = `${date.getFullYear()}`;
    let anio = year.slice(2,4);
    const users = await User.find();
    let numSig = users.length + 1;
    let matricula = `${anio}02${zeroFill(numSig, 4)}`;
    return matricula;
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
    const isFicha = /acta/;
    if(isFicha.test(files[0].originalname))
        return files[0]
    else if(isFicha.test(files[1].originalname))
        return files[1];
    console.log('ficha es vacio')
}

const getAportacion = (files) => {
    const isAportacion = /certificado/;
    if(isAportacion.test(files[0].originalname))
        return files[0];
    else if(isAportacion.test(files[1].originalname))
        return files[1];
    console.log('aportacion es vacio')
}