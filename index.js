/*Simple tutorial for GET and POST requests on a local server built using tutorial material from Mosh's RESTful APIs using Node.js and Expressjs
, I used the Joi.js API for the input authentication purposes.*/

const joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];

app.get('/', (req,res) => {
    res.send('Hey there, Hello World');
});

app.get('/api/courses', (req,res) => {
    res.send(courses);
});

app.post('/api/courses', (req,res) => {
    const schema = {
        name: joi.string().min(3).required()
    };

    const result = joi.validate(req.body, schema);
    console.log(result);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.get('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given id was not found');
    res.send(course);
});

//Dynamically assigning a port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on Port ${port}`));
