import Task from '../models/Task';
import { getPagination } from '../libs/getPaginations';

export const findAllTasks = async (req, res) => {
    try{
        const { size, page, title } = req.query;
        const condition = title ? {
            title: {$regex: new RegExp(title), $options: "i"},
        }: {};

        const {limit, offset} = getPagination(page, size);

        const data = await Task.paginate(condition, {offset, limit});
        res.json({
            totalItem: data.totalDocs,
            tasks: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page - 1
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras devolviamos las tareas",
        });
    }
}

export const createTask = async (req, res) => {
    //usar express-validator para validar
    if(!req.body.title || !req.body.description){
        return res.status(404).send({
            message: "El title o description  no puede ser vacío en el body"
        })
    }
    
    try{
        const newTask = new Task({
            title: req.body.title, 
            description: req.body.description,
            done: req.body.done ? req.body.done : false,
        });
        const tasksave = await newTask.save();
        res.json(tasksave)
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras devolviamos las tareas",
        });
    }
}

export const findOneTask = async (req, res) => {
    const { id } = req.params;
    try{
        const task = await Task.findById(id);

        if(!task) return res.status(404).json({
            message: `La tarea con el id: ${id} no existe`
        })

        res.json(task)
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error devolviendo una tarea con el id: ${id}`,
        });
    }
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try{
        await Task.findByIdAndDelete(id)
        res.json({
            message: 'Tarea ha sido eliminada exitosamente'
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error eliminado una tarea con el id: ${id}`,
        });
    }
}

export const findAllDoneTask = async (req, res) => {
    try{
        const tasks = await Task.find({done: true});
        res.json(tasks);
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error encontrando las tareas con done true`,
        });
    }
}

export const updateTask = async (req, res) => {
    const { id } = req.params;
    if(!req.body.title){
        return res.status(404).send({
            message: "El title no puede ser vacío en el body"
        })
    }
    try{
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        });
        res.json({message: 'La tarea fue actualizada exitosamente'})
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error actualizando la tarea con el id: ${id}`,
        });
    }
}

