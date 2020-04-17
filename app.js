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

// GET
app.get('/api/dogs', (req, res) => {
    res.status(200).send(dogs)
})

app.get('/api/dogs/:id', (req, res) => {
    const dog = dogs.find( d => d.id === parseInt(req.params.id))

    if(!dog){
        return res.status(404).send('Cannot find dog with this ID')
    }
    res.status(200).send(dog)
})

//POST
app.post('/api/dogs', (req, res) => {
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

    res.status(201).send(dog)
})

//PUT
app.put('/api/dogs/:id', (req, res) => {
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
    res.status(200).send(dog)
})

//DELETE

app.delete('/api/dogs/:id', (req, res) => {
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
    res.status(200).send(dog)
})

//WHERE TO LISTEN
app.listen(5000, () => {
    console.log(`Listening to port 5000`)
})