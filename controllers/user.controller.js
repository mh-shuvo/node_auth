const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
exports.register = async (req, res) => {
    let duplicateErrors = [];
    let checkIsEmailExists = await User.findBy({
        'email': req.body.email
    }, 'email');

    let checkIsPhoneExists = await User.findBy({
        'phone': req.body.phone
    }, 'phone');

    if (checkIsEmailExists) duplicateErrors.push("Email already exists.")
    if (checkIsPhoneExists) duplicateErrors.push("Phone already exists.")

    if (duplicateErrors.length != 0) return res.status(400).json(duplicateErrors);

    const salt = await bcrypt.genSalt(10);
    const hashPasssword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPasssword,
        phone: req.body.phone,
        status: req.body.status || 1
    });
    // Save User in the database
    try {
        const id = await User.register(user);
        user.id = id;
        delete user.password;
        res.send(user);
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.login = async (req, res) => {
    let user = await User.login(req.body.username);
    if (user) {
        let isValid = await bcrypt.compare(req.body.password, user.password);
        if (!isValid) return res.status(404).send("Username & Password do not match");
        return res.status(200).send("Successfully Logged in");
    } else {
        res.status(404).send("Account not found with your entered username");
    }
};
exports.find = async (req, res) => {
    const user = await User.findBy({
        id: req.params.id
    }, 'id');

    if (user.length) {
        delete user[0].password;
        res.send({
            'status': 'success',
            'statusCode': 200,
            'data': user[0],
            'message': null
        });
    } else {
        res.send({
            'status': 'Not Found',
            'statusCode': 404,
            'data': null,
            'message': 'No user found with your given request'
        });
    }
}