const { connectDb } = require('./connectDb')

const createSkill = async (skillData) => {
    const { client, db } = connectDb('ardent', 'skill')
    const result = await db.insertOne(skillData)
    client.close()
    return result
}

const getAllSkills = async () => {
    const { client, db } = connectDb('ardent', 'skill')
    const allskills = await db.find().toArray()
    client.close()
    return allskills
}

const getOneSkill = async (filter) => {
    const { client, db } = connectDb('ardent', 'skill')
    const skill = await db.findOne(filter)
    client.close()
    return skill
}

const updateSkill = async (filter, body) => {
    const { client, db } = connectDb('ardent', 'skill')
    const skill = await db.updateOne(filter, { $set: body })
    client.close()
    return skill
}

const deleteSkill = async (filter) => {
    const { client, db } = connectDb('ardent', 'skill')
    const skill = await db.deleteOne(filter)
    client.close()
    return skill
}

module.exports = {
    createSkill,
    getAllSkills,
    getOneSkill,
    updateSkill,
    deleteSkill
}