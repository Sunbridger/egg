module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
    const User = app.model.define('User', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name: STRING(30),
        age: INTEGER,
        createdAt: {
            type: DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: DATE,
            field: 'updated_at',
        },
    });
    return User;
};