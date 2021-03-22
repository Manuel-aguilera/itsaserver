//comprueba si no es correo institucional 
const isTemporaryOrUser = (email = "al16020419@itsa.edu.mx") => {
    const isMatriculado = /al/;
    const isInstitucional = /itsa.edu.mx/;
    if(isInstitucional.test(email)){
        console.log("Es institucional por lo tanto ya está registrado en la tabla de usuarios");
        if(isMatriculado.test(email)){
            console.log("Tiene matrícula por lo que concluimos que es un alumno");
            const correo = email.split("@");
            const dominio = correo[1];
            const matricula = correo[0].split("al")[1];
            console.log(dominio)
            console.log(matricula)
        }
        else
            console.log("Es un correo institucional de un docente ya que ellos no tienen matricula");
    }
    else{
        console.log("No es institucional entonces creamos el usuario temporal");
    }
}

isTemporaryOrUser();