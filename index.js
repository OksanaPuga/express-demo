const express = require('express');
const app = express();
const port = process.env.port || 3000;

const COURSES = [
    { id: 1, name: 'Course 1' },
    { id: 2, name: 'Course 2' },
    { id: 3, name: 'Course 3' }
];

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(COURSES);
});

app.get('/api/courses/:id', (req, res) => {
    const course = COURSES.find(
        course => course.id === parseInt(req.params.id)
    );
    if (course) {
        res.send(course);
    } else {
        res.status(404).send('The course with this ID was not found');
    }
});

app.post('/api/courses', (req, res) => {
    const course = {
        id: COURSES.length + 1,
        name: req.body.name
    };
    COURSES.push(course);
    res.send(course);
})

app.listen(port, () => console.log(`listening on port ${port}...`))