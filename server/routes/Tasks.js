const express = require('express')
const { Tasks } = require('../models');
const {Archived} = require('../models');
const router = express.Router()
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Tasks.findAll();
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})
router.post('/task', async (req, res) => {
    const task = req.body
    await Tasks.create(task)
    res.status(200).json('task added successfully')
})
router.put('/task/:id', async (req, res) => {
    const taskId = req.params.id
    const updatedTaskData = req.body
    try {
        const task = await Tasks.findByPk(taskId)
        if (!task) {
            return res.status(404).json({ error: 'Task not found' })
        }
        await task.update(updatedTaskData)
        res.json(task)
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})


router.delete('/task/:id', async (req, res) => {
    const taskId = req.params.id
    try {
        const task = await Tasks.findByPk(taskId)
        if (!task) {
            return res.status(404).json({ error: 'Task not found' })
        }
        await task.destroy()
        res.json({ message: 'task deleted successfully' })
    } catch (error) {
        console.error('error deleting task', error)
        res.status(500).json({ error: 'internal server error' })
    }
})
module.exports = router