const express = require('express');
const app = express();
const Joi = require('joi');
const port = process.env.port || 3000;

const courseNotFoundMsg = 'The course with this ID was not found';
let COURSES = [
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
    const course = findCourse(req.params.id);

    if (!course) return res.status(404).send(courseNotFoundMsg);

    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const validation = validateCourse(req.body);

    if (validation.error) return sendValidationError(validation.error, res);

    const course = {
        id: COURSES.length + 1,
        name: req.body.name
    };
    COURSES.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = findCourse(req.params.id);
    const validation = validateCourse(req.body);

    if (!course) return res.status(404).send(courseNotFoundMsg);
    if (validation.error) return sendValidationError(validation.error, res);

    Object.keys(req.body).forEach(key => course[key] = req.body[key]);
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = findCourse(req.params.id);

    if (!course) return res.status(404).send(courseNotFoundMsg);

    const idx = COURSES.indexOf(course);
    COURSES.splice(idx, 1);

    res.send(course);
});


const findCourse = id => COURSES.find(
    course => course.id === parseInt(id)
);

const validateCourse = course => {
    const scema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, scema);
}

const sendValidationError = (error, res) => {
    const errorMsg = error.details[0].message;
    res.status(400).send(errorMsg);
}

app.listen(port, () => console.log(`listening on port ${port}...`))