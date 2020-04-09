const express = require('express')
const app = express()

app.use(express.json)

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

app.listen(3000, () => {
    console.log('Listening to port 3000...')
})