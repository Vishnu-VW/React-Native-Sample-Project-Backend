const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db')
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const signup = (req,res) => {
    console.log(req.body);
    const {fullname:name , email, password, confirmPassword} = req.body;

    if(password !== confirmPassword){
        return res.status(400).send('Password do not match');
    }

    db.query('SELECT * FROM users WHERE email = ?',[email], (err,result) =>{
        // console.log(result)
        if (err){
            return res.status(500).send('Server Error');
        }
        if(result.length > 0){
            return res.status(400).send('Email already exist');
        }

        const hashedPassword = bcrypt.hashSync(password,8);
        db.query(
            'INSERT INTO users (fullname,email,password) VALUES (?, ?, ?)',[name,email,hashedPassword],
            (err, result) =>{
                if(err){
                    console.log(err)
                    return res.status(500).send('Server Error');
                }
                return res.status(201).send('User registered successfully');
            }
        );
    });
};

const login = (req, res) =>{
    const {email,password} = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err,result) =>{
        if(err){
            return res.status(500).send('Server Error');
        }
        if(result.length == 0){
            return res.status(400).send('User not found');
        }
        console.log(result);
        const user = result[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if(!passwordIsValid){
            return res.status(401).send('Invalid Password');
        }

        const token = jwt.sign({id : user.id}, secretKey, {expiresIn : 86400});
        return res.status(200).send({
            auth : true,
            token,
            fullname : user.fullname,
            email : user.email
        });
    })
}

module.exports = {
    signup,
    login
}