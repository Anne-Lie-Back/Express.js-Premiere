
fetch("http://localhost:5000/dogs").then((response) => {
    return response.json()
}).then((dogs) => {
    printAllDogs(dogs)
})

function printAllDogs(dogs){
    let container = document.getElementById('listOfDogs')

    dogs.forEach(dog => {
        let dogName = document.createElement('h3')
        dogName.innerText = dog.name
        let dogBreed = document.createElement('h5')
        dogBreed.innerText = dog.breed
        let dogAge = document.createElement('h5')
        dogAge.innerText = `Ålder: ${dog.age}år`

        let dogDiv = document.createElement('div')
        dogDiv.appendChild(dogName)
        dogDiv.appendChild(dogBreed)
        dogDiv.appendChild(dogAge)

        container.appendChild(dogDiv)
    })
}