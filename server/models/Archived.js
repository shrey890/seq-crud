// models/ArchivedTasks.js

module.exports = (sequelize, DataTypes) => {
    const ArchivedTasks = sequelize.define('ArchivedTasks', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        task: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
 
    ArchivedTasks.associate = (models) => {
        ArchivedTasks.belongsTo(models.Tasks);
    };
    return ArchivedTasks
}
