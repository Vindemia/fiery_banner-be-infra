const { connectDb } = require('./connectDb')

const createCharacter = async (characterData) => {
    const baseCharacter = {
        ...characterData,
        xp: 0,
        hp: 3,
        armaor: 0,
        skills: []
    }
    const { client, db } = connectDb('ardent', 'character')
    const result = await db.insertOne(baseCharacter)
    client.close()
    return result
}

const getAllCharacter = async () => {
    const { client, db } = connectDb('ardent', 'character')
    const allCharacters = await db.find().toArray()
    client.close()
    return allCharacters
}

const getOneCharacter = async (filter) => {
    const { client, db } = connectDb('ardent', 'character')
    const character = await db.findOne(filter)
    client.close()
    return character
}

const updateCharacter = async (filter, body) => {
    const { client, db } = connectDb('ardent', 'character')
    const result = await db.updateOne(filter, { $set: body })
    client.close()
    return result
}

module.exports = {
    createCharacter,
    getAllCharacter,
    getOneCharacter,
    updateCharacter
}