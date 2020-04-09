const express = require('express')
const app = express()

app.use(express.json())

const dogs = [
    {
        id: 1,
        name: 'Ninja',
        breed: 'Shetland Sheepdog',
        age: 10
    },
    {
        id: 2,
        name: 'Casper',
        breed: 'Chihuahua',
        age: 11
    },
    {
        id: 3,
        name: 'Eros',
        breed: 'Blandis',
        age: 14
    },
    {
        id: 4,
        name: 'Furion',
        breed: 'Corgi',
        age: 2
    }
] 

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

function generateID(){
     return new Date().getUTCMilliseconds()
}

//POST
app.post('/dogs', (req, res) => {
    if(!req.body.breed||!req.body.breed||!req.body.age){
        return res.status(400).send('You missed something in your input')
    }
    const dog = {
        id: generateID(),
        name: req.body.name,
        breed: req.body.breed,
        age: req.body.age
    }

    dogs.push(dog)
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
    res.send(dog)
})

//WHERE TO LISTEN
const port = 5000

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})