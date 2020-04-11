const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.json())
app.use(express.static('public'))

const data = fs.readFileSync('dogs.json')
const dogs = JSON.parse(data)
/* [
    {
        "name":"Ninja",
        "breed":"Shetland Sheepdog",
        "age": 10
    },
    {
        "name":"Casper",
        "breed":"Chihuahua",
        "age": 11
    }
] */

function generateID(){
    return new Date().getUTCMilliseconds()
}

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
app.post('/dogs', (req, res) => {
    if(!req.body.breed||!req.body.breed||!req.body.age||!req.body.age.match(/^[0-9]+$/)){
        return res.status(400).send('You missed something in your input. Name? Breed? Age in number of years?')
    }

    const dog = {
        id: generateID(),
        name: req.body.name,
        breed: req.body.breed,
        age: req.body.age
    }

    
    //THIS IS NOT WORKING (DIDN'T UPDATE JSON-file)
    fs.readFile('./dogs.json', 'utf8', () => {

        console.log('hello!')
        //dogs[dog] = JSON.parse(dogs)
        //dogs[dog] = JSON.parse(req.body.dogs)
        dogs.push(dog)
        const data = JSON.stringify(dogs, null, 2)
        fs.writeFile('./dogs.json', data, 'utf8', () => {
            console.log('went good')
            
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

        console.log('hello Outbyto!')
        const data = JSON.stringify(dogs, null, 2)
        fs.writeFile('./dogs.json', data, 'utf8', () => {
            console.log('went good to exchange')
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
        console.log('went good to delete')
    }) 
    res.send(dog)
})

//WHERE TO LISTEN
app.listen(5000, () => {
    console.log(`Listening to port 5000`)
})