import Role from '../models/Role';
import TipoPago from '../models/TipoPago';

export const createRoles = async () => {
    try{
        const count = await Role.estimatedDocumentCount();
        if(count > 0)
            return;
        const values = await Promise.all([
            new Role({name: 'user'}).save(),
            new Role({name: 'moderator'}).save(),
            new Role({name: 'admin'}).save(),
        ]);

        console.log(values);
    }
    catch(error){
        console.error(error.message);
    }
}

export const createTipoPagos = async () => {
    try{
        const count = await Role.estimatedDocumentCount();
        if(count > 0)
            return;
        const tipoPagos = await new TipoPago({
            "fichas": [
                    {ficha: "CAMBIO DE FICHA", costo: "700"},
                    {ficha: "FICHA DE ADMISIÓN CONTADOR PUBLICO", costo: "1200"},
                    {ficha: "FICHA DE ADMISIÓN INGENIERIA EN GESTION EMPRESARIAL", costo: "1200"},
                    {ficha: "FICHA DE ADMISIÓN INGENIERIA BIOQUIMICA", costo: "1200"},
                    {ficha: "FICHA DE ADMISIÓN INGENIERIA  CIVIL", costo: "1200"},
                    {ficha: "FICHA DE ADMISIÓN INGENIERIA  INFORMATICA", costo: "1200"},
                    {ficha: "FICHA DE ADMISIÓN INGENIERIA  INDUSTRIAL", costo: "1200"},
                    {ficha: "FICHA DE ADMISION ING. EN INNOVACION AGRICOLA SUSTENTABLE", costo: "1200"},
                    {ficha: "FICHA DE ADMISIÓN ING. EN SISTEMAS COMPUTACIONALES", costo: "1200"},
            ], 
            "inscripcion": [
                    {ficha: "APORTACIÓN PARA EL FORTALECIMIENTO INSTITUCIONAL NUEVO INGRESO", costo: "1000"},
                    {ficha: "EXCEPCIÓN DE INSCRIPCION POR GRATUIDAD", costo: "0"},
            ],
            "reinscripcion": [
                    {ficha: "APORTACIÓN PARA EL FORTALECIMIENTO INSTITUCIONAL REINGRESO", costo: "350"},
                    {ficha: "EXCEPCIÓN DE REINSCRIPCION POR GRATUIDAD", costo: "0"},
            ],
            "constanciasKardex": [
                    {ficha: "CONSTANCIA PARA RESIDENCIAS PROFESIONALES", costo: "80"},
                    {ficha: "CONSTANCIA DE ESTUDIOS CON CALIFICACIONES", costo: "60"},
                    {ficha: "CONSTANCIA DE ESTUDIOS SIN CALIFICACIONES", costo: "40"},
                    {ficha: "KARDEX", costo: "60"},
            ], 
            "tramitesEgreso": [
                    {ficha: "TRAMITE DE EGRESOS", costo: "1000"},
            ],
            "titulacion": [
                    {ficha: "CARTA DE PASANTE PAPEL OFICIAL", costo: "2000"},
                    {ficha: "CERTIFICADO OFICIAL (TERMINACIÓN DE ESTUDIOS)", costo: "2500"},
                    {ficha: "CERTIFICADO PARCIAL", costo: "1000"},
                    {ficha: "CURSO DE TITULACIÓN", costo: "4000"},
                    {ficha: "DUPLICADO DE CERTIFICADO", costo: "1000"},
                    {ficha: "REPOSICION DE ACTA DE EXÁMEN PROFESIONAL", costo: "5000"},
                    {ficha: "TITULO PROFESIONAL", costo: "4500"},
                    {ficha: "REPOSICION DE ACTA DE EXÁMEN PROFESIONAL", costo: "1000"},
            ],
            "ingles": [
                    {ficha: "CURSO DE INGLES INTERNO 13VO NIVEL (90hrs)", costo: "1400"},
                    {ficha: "CURSO DE INGLES INTERNO 2 NIVELES (90hrs)", costo: "1400"},
                    {ficha: "CURSO DE INGLES INTERNO 3 NIVELES (135hrs)", costo: "2100"},
                    {ficha: "CURSO DE INGLES INTERNO 4 NIVELES (180hrs)", costo: "2800"},
                    {ficha: "CONSTANCIA DE ESTUDIOS POR NIVEL CON CALIFICACIONES (INGLES INTERNO)", costo: "100"},
                    {ficha: "CONSTANCIA DE LIBERACIÓN CON VALOR CURRICULAR POR REGISTRO DE CLE (INTERNOS)", costo: "500"},
                    {ficha: "CONSTANCIA DE ESTUDIOS POR NIVEL (INGLES INTERNO)", costo: "100"},
                    {ficha: "CUOTA ADICIONAL PÉRDIDA DE MATERIAL BIBLIOGRÁFICO", costo: "200"},
                    {ficha: "CURSO DE ACREDITACIÓN DE INGLES", costo: "900"},
                    {ficha: "CURSO DE INGLES INTERNO 1 NIVEL (45hrs)", costo: "700"},
                    {ficha: "EXAMEN DE ACREDITACIÓN DE INGLES", costo: "1200"},
                    {ficha: "EXAMEN DE UBICACIÓN DE INGLES", costo: "500"},
            ],
        }).save();

        console.log(tipoPagos); 
    }
    catch(error){
        console.error(error.message);
    }
}