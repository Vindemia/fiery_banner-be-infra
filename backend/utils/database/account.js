const bcrypt = require('bcrypt');
const { connectDb } = require('./connectDb')


const register = async ({ username, password }) => {
    const { client, db } = connectDb('ardent', 'auth')
    const passwordhash = await bcrypt.hash(password, 10)
    const result = await db.insertOne({
        username,
        password: passwordhash,
        userType: "USER",
        characterList: []
    })
    client.close()
    return result
}

const login = async ({ username, password }) => {
    const { client, db } = connectDb('ardent', 'auth')
    const result = await db.findOne({ username })
    console.log(result)
    if (result === null) {
        return {
            loginValide: false
        }
    }
    const isRightPassword = await bcrypt.compare(password, result.password)
    client.close()
    delete result.password
    return {
        loginValide: isRightPassword,
        user: result
    }
}

module.exports = { login, register }