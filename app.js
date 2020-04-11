const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

const data = fs.readFileSync('dogs.json')
const dogs = JSON.parse(data)

function generateID(){
    return new Date().getUTCMilliseconds()
}

/* app.post('/submit-form', (req, res) =>{
    const name = req.body.name
    const breed = req.body.breed
    const age = req.body.age
    res.end()
}) */

// GET
app.get('/dogs', (req, res) => {
    res.send(dogs)
})

app.get('/dogs/:id', (req, res) => {
    const dog = dogs.find( d => d.id === parseInt(req.params.id))

    if(!dog){
        return res.status(404).send('Cannot find dog with this ID')
    }
    res.send(dog)
})

//POST
app.post('/submit-form', (req, res) => {
    if(!req.body.breed||!req.body.breed||!req.body.age||!req.body.age.match(/^[0-9]+$/)){
        return res.status(400).send('You missed something in your input. Name? Breed? Age in number of years?')
    }

    const dog = {
        id: generateID(),
        name: req.body.name,
        breed: req.body.breed,
        age: req.body.age
    }

    fs.readFile('./dogs.json', 'utf8', () => {
        dogs.push(dog)
        const data = JSON.stringify(dogs, null, 2)
        fs.writeFile('./dogs.json', data, 'utf8', () => {
            console.log('Dog added!')  
        })   
    })

    res.send(dog)
})

//PUT
app.put('/dogs/:id', (req, res) => {
    const dog = dogs.find(d => d.id == parseInt(req.params.id))
    if(!dog){
        return res.status(404).send('Can not find dog with this ID')
    }

    dog.name = req.body.name
    dog.breed = req.body.breed
    dog.age = req.body.age

    fs.readFile('./dogs.json', 'utf8', () => {
        const data = JSON.stringify(dogs, null, 2)
        fs.writeFile('./dogs.json', data, 'utf8', () => {
            console.log('Dog pupdated!')
        })   
    })
    res.send(dog)
})

//DELETE

app.delete('/dogs/:id', (req, res) => {
    const dog = dogs.find( d => d.id === parseInt(req.params.id))
    if(!dog){
        return res.status(404).send('The specific doggo was not found')
    }

    const index = dogs.indexOf(dog)
    dogs.splice(index, 1)
    const data = JSON.stringify(dogs, null, 2)
    fs.writeFile('./dogs.json', data, 'utf8', () => {
        console.log('Dog deleted!')
    }) 
    res.send(dog)
})

//WHERE TO LISTEN
app.listen(5000, () => {
    console.log(`Listening to port 5000`)
})