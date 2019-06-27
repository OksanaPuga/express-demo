const express = require('express');
const app = express();
const Joi = require('joi');
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
    const course = findCourse(req.params.id);
    if (course) {
        res.send(course);
    } else {
        res.status(404).send('The course with this ID was not found');
    }
});

app.post('/api/courses', (req, res) => {
    const validation = validateCourse(req.body);

    if (validation.error) {
        sendValidationError(validation.error, res);
        return;
    }
    
    const course = {
        id: COURSES.length + 1,
        name: req.body.name
    };
    COURSES.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = findCourse(req.params.id);

    if (!course) {
        res.status(404).send('The course with this ID was not found');
        return;
    }

    const validation = validateCourse(req.body);

    if (validation.error) {
        sendValidationError(validation.error, res);
        return;
    }

    Object.keys(req.body).forEach(key => course[key] = req.body[key]);
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