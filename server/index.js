const express = require('express');
const cors = require('cors');
const db = require('./models');
const app = express();
app.use(cors())
app.use(express.json())
const TaskRouter = require('./routes/Tasks')
app.use('/',TaskRouter)
const archiveRouter = require('./routes/Archive')
app.use('/',archiveRouter)
db.sequelize.sync().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log('listening on port 3000')
    })
})