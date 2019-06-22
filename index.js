const express = require('express');
const app = express();
const port = process.env.port || 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(req.query);
});

app.get('/api/about', (req, res) => {
    res.send('Me, at the middle of the night...')
})

app.get('/api/courses/:id', (req, res) => {
    res.send(req.params.id);
})

app.listen(port, () => console.log(`listening on port ${port}...`))