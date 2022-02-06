const e = require('express');
const sql = require('../config/db.js');
const User = function (user) {
    if (typeof user.id != 'undefined') {
        this.id = user.id;
    }
    this.phone = user.phone;
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
    this.status = user.status;
    if (typeof user.created_at != 'undefined') {
        this.created_at = user.created_at;
    }
    if (typeof user.updated_at != 'undefined') {
        this.updated_at = user.updated_at;
    }
};

User.register = async (newUser) => {
    let insert = await sql.query('INSERT INTO user SET ?', newUser);
    if (insert.insertId) {
        return insert.insertId;
    }
    else {
        return false;
    }
}

User.login = async (keyword) => {
    let query = await sql.query(`SELECT * FROM user WHERE email=? OR phone=?`, [keyword, keyword]);
    if (sql) {
        return query[0];
    } else {
        return false;
    }
}

User.findBy = async (data, field) => {
    let row = await sql.query(`SELECT * FROM user WHERE ${field}=?`, data[field]);
    if (row) {
        return row[0];
    } else {
        return false;
    }
}
module.exports = User