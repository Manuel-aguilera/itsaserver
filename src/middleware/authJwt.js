import jwt from 'jsonwebtoken';
import config from '../config';
import UserWeb from '../models/UserWeb';
import Role from '../models/Role';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if(!token)
            return res.json({
                data: [],
                status: "failed",
                message: "El token no ha sido proveido",
            })
        
        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.id;
        const userWeb = await UserWeb.findById(req.userId, {password: 0});
        if(!userWeb)
            return res.json({
                data: [],
                status: "failed",
                message: "El usuario no existe",
            })  
        else 
            next();
    } catch (error) {
        return res.json({
            data: [],
            status: "failed",
            message: "No tienes autorizacion",
        })
    }
}

export const isAdmin = async (req, res, next) => {
    const userFound = await UserWeb.findById(req.userId);
    const roles = await Role.find({_id: {$in: userFound.roles}});
    for (let i = 0; i < roles.length; i++) {
        if(roles[i].name === 'admin'){
            next();
            return;
        }
    }
    return res.json({
        data: [],
        status: "failed",
        message: "No tienes el rol de admin",
    })
}

export const isModerator = async (req, res, next) => {
    const userFound = await UserWeb.findById(req.userId);
    const roles = await Role.find({_id: {$in: userFound.roles}});
    for (let i = 0; i < roles.length; i++) {
        if(roles[i].name === 'moderator'){
            next();
            return;
        }
    }
    return res.json({
        data: [],
        status: "failed",
        message: "No tienes el rol de moderator",
    })
}
