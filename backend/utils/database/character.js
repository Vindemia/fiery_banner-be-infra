const { connectDb } = require('./connectDb')

const createCharacter = async (characterData) => {
    const { client, db } = connectDb('ardent', 'character')
    const result = await db.insertOne(characterData)
    client.close()
    return result
}

const getAllCharacter = async () => {
    const { client, db } = connectDb('ardent', 'character')
    const allCharacters = await db.find().toArray()
    client.close()
    return allCharacters
}

const getOneCharacter = async (name) => {
    const { client, db } = connectDb('ardent', 'character')
    const character = await db.findOne({ name })
    client.close()
    return character
}

module.exports = {
    createCharacter,
    getAllCharacter,
    getOneCharacter
}