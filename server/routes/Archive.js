// routes/archivedTasks.js
const express = require('express');
const router = express.Router();
const archivedTasksController = require('../controller/Archive');
router.get('/archive', archivedTasksController.getAllArchivedTasks);
router.put('/archive/:id', archivedTasksController.archiveTask);
router.delete('/archive/:id', archivedTasksController.deleteArchivedTask);
module.exports = router;
