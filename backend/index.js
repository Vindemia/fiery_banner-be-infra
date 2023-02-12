const express = require('express');
const cors = require('cors');
const { getAllCharacter, getOneCharacter, createCharacter } = require('./utils/database/character')
const { register, login } = require('./utils/database/account')

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

app.get('/characters', async (req, res) => {
    const result = await getAllCharacter()
    res.send(result);
});

app.get('/characterByName/:name', async (req, res) => {
    const result = await getOneCharacter(req.params.name)
    res.send(result);
});

app.post('/character', async (req, res) => {
    const result = await createCharacter(req.body)
    res.send(result)
})

app.post('/login', async (req, res) => {
    const result = await login(req.body)
    res.send(result)
})

app.post('/register', async (req, res) => {
    const result = await register(req.body)
    res.send(result)
})


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
