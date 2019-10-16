'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
// 这个User命名是随意的 主要还是看user.js这个文件的名 首字母大写？
  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    age: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  return User;
};