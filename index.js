/*Simple tutorial for GET and POST requests on a local server built using tutorial material from Mosh's RESTful APIs using Node.js and Expressjs
, I used the Joi.js API for the input authentication purposes.*/

const joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());



//Array containing dummy objects
const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];



//GET Request using Expressjs
app.get('/', (req,res) => {
    res.send('Hey there, Hello World');
});

app.get('/api/courses', (req,res) => {
    res.send(courses);
});



//POST Request using Expressjs
app.post('/api/courses', (req,res) => {
    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});



//PUT(Update Request) using Expressjs
app.put('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id was not found'); 

//Joi.js Schema to validate input data
    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});



//DELETE Request using Expressjs
app.delete('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id was not found'); 

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});



//Validation Refactored
function validateCourse(course) {
    const schema = {
        name: joi.string().min(3).required()
    };
    
    return result = joi.validate(course, schema);
}



//GET Request with error catching and course parameters retrieval using Expressjs
app.get('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id was not found');
    res.send(course);
});




//Dynamically assigning a port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on Port ${port}`));
