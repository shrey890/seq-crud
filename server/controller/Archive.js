// controllers/archivedTasksController.js
const { ArchivedTasks } = require('../models');

exports.getAllArchivedTasks = async (req, res) => {
  try {
    const archivedTasks = await ArchivedTasks.findAll();
    res.json(archivedTasks);
  } catch (error) {
    console.error('Error fetching archived tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.archiveTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await ArchivedTasks.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await task.update({ archived: true });
    res.json(task);
  } catch (error) {
    console.error('Error archiving task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteArchivedTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await ArchivedTasks.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await task.destroy();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting archived task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
