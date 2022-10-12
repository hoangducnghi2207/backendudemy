import bcrypt from 'bcryptjs'
import mysql from 'mysql2/promise'
import Bluebird from 'bluebird';

const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword
}

const createNewUser = async (email, password, username) => {
    let hashpass = hashUserPassword(password)
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: Bluebird
    })
    connection.query(
        'INSERT INTO users (email, password, username) VALUES(?,?,?)', [email, hashpass, username],
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
            if (err) {
                console.log(26, err);
            }
        }
    );

}

const getUserList = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: Bluebird
    })
    let users = []
    try {
        const [rows, fields] = await connection.execute('SELECT * from users');
        return rows
    } catch (error) {
        console.log("check error", error);
    }

}
const deleteUser = async (id) => {
    // DELETE FROM users WHERE id='Alfreds Futterkiste';
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: Bluebird
    })
    try {
        const [rows, fields] = await connection.execute('DELETE FROM users WHERE id=?', [id]);
        return rows
    } catch (error) {
        console.log("check error", error);
    }

}
const getUserById = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: Bluebird
    })
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users WHERE id=?', [id]);
        return rows
    } catch (error) {
        console.log("check error", error);
    }

}
const updateUserInfo = async(email, username,id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: Bluebird
    })
    try {
        const [rows, fields] = await connection.execute('UPDATE users SET email= ?, username= ?  WHERE id= ?', [email,username,id]);
        return rows
    } catch (error) {
        console.log("check error", error);
    }

}
module.exports = { createNewUser, getUserList, deleteUser, getUserById,updateUserInfo }