import UserWeb from '../models/UserWeb';
import { ROLES } from '../models/Role';

export const checkRolesExisted = async (req, res, next) => {
    if(req.body.roles){
        for (let i = 0; i < req.body.roles.length; i++) {
            if(!ROLES.includes(req.body.roles[i])){
                return res.json({
                    data: [],
                    status: "failed",
                    message: `El role ${req.body.roles[i]} no existe`,
                })
            }
        }
    }
    next();
}

export const checkDuplicateUserAndEamil = async (req, res, next) => {
    const { username, email} = req.body;
    const user = await UserWeb.findOne({username}, {username: 1});
    if(user) 
        return res.json({
            data: [],
            status: "failed",
            message: `El usuario ${user.username} ya existe`,
        }) 
    const correo = await UserWeb.findOne({email}, {email: 1});
    if(correo) 
        return res.json({
            data: [],
            status: "failed",
            message: `El email ${correo.email} ya existe`,
        })
    next();  
}