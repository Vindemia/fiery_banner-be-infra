const express = require('express');
const { getAllCharacter, getOneCharacter, createCharacter } = require('./utils/database/character')

const app = express();
app.use(express.json())

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

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
