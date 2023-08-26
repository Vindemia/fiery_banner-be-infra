const express = require('express');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const { getAllCharacter, getOneCharacter, createCharacter, updateCharacter } = require('./utils/database/character')
const { getAllSkills, getOneSkill, createSkill, updateSkill, deleteSkill } = require('./utils/database/skill')
const { register, login, updateCharacterList, chracterListByUserId } = require('./utils/database/account')

const app = express();
app.use(express.json())
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

// Character CRUD
app.get('/characters', async (req, res) => {
    const result = await getAllCharacter()
    res.send(result);
});

app.get('/characterByName/:name', async (req, res) => {
    const result = await getOneCharacter({ username: req.params.id })
    res.send(result);
});

app.get('/characterById/:id', async (req, res) => {
    const result = await getOneCharacter({ _id: new ObjectId(req.params.id) })
    res.send(result);
});

app.post('/character', async (req, res) => {
    console.log(req.body)
    const result = await createCharacter(req.body.character)
    console.log(result.insertedId.toString())
    await updateCharacterList({ _id: new ObjectId(req.body.userId) }, result.insertedId.toString())
    res.send(result)
})

app.post('/character/:id', async (req, res) => {
    const result = await updateCharacter({ _id: new ObjectId(req.params.id) }, req.body)
    res.send(result)
})

// Skills CRUD
app.get('/skills', async (req, res) => {
    const result = await getAllSkills()
    res.send(result);
});

app.get('/skill/:id', async (req, res) => {
    const result = await getOneSkill({ _id: new ObjectId(req.params.id) })
    res.send(result);
});

app.put('/skill/:id', async (req, res) => {
    const result = await updateSkill({ _id: new ObjectId(req.params.id) }, req.body)
    res.send(result);
});

app.delete('/skill/:id', async (req, res) => {
    const result = await deleteSkill({ _id: new ObjectId(req.params.id) })
    res.send(result);
});

app.post('/skill', async (req, res) => {
    const result = await createSkill(req.body)
    res.send(result)
})

// Account Login and Register
app.post('/login', async (req, res) => {
    const result = await login(req.body)
    res.send(result)
})

app.post('/register', async (req, res) => {
    const result = await register(req.body)
    res.send(result)
})

app.get('/characterListByUserId/:id', async (req, res) => {
    const result = await chracterListByUserId({ _id: new ObjectId(req.params.id) })
    res.send(result)
})

app.get('/rules', async (req, res) => {
    // Fetch rules from the database and return them.
    console.log("get Rules")
});

app.put('/rules', async (req, res) => {
    // Update the rules in the database based on the request body.
    console.log("put Rules")
});



const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
