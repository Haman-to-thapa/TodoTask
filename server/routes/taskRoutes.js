import express from 'express'
import { createTask, deleteTask, getAllTasks, updatedTask } from '../controller/taskController.js';


const router = express.Router()


router.post('/', createTask);
router.get('/', getAllTasks);
router.put('/:id', updatedTask);
router.delete('/:id', deleteTask);


export default router;