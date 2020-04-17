window.addEventListener('load', init);

function init(){
    fetchAllDogs()
    const searchButton = document.getElementById('idSearch')
    searchButton.addEventListener('click', showSpecificDogById)
    const submitButton = document.getElementById('submitButton')
    submitButton.addEventListener('click', () => {addDogFromForm(event)})
}

function fetchAllDogs(){
    fetch("http://localhost:5000/api/dogs").then((response) => {
        return response.json()
    }).then((dogs) => {
        printAllDogs(dogs)
    })
}

/************* All dogs-list (GET dogs) ***************/

function printAllDogs(dogs){
    let container = document.getElementById('listOfDogs')
    container.innerHTML = ""

    dogs.forEach(dog => {
        let idNameWrapper = document.createElement('div')
        idNameWrapper.setAttribute('class', 'idNameWrapper')

        let dogName = document.createElement('h2')
        dogName.innerText = dog.name

        let dogID = document.createElement('h4')
        dogID.setAttribute('class', 'inlineH2')
        dogID.innerText = `Id: ${dog.id}`

        let dogBreed = document.createElement('p')
        dogBreed.innerText = dog.breed

        let dogAge = document.createElement('p')
        dogAge.innerText = `Human years: ${dog.age}`

        let deleteButton = document.createElement('button')
        deleteButton.innerText = 'Delete'
        deleteButton.addEventListener('click',() => { 
            fetch(`/api/dogs/${dog.id}`, {method: 'DELETE'}, fetchAllDogs())
        });

        let updateButton = document.createElement('button')
        updateButton.innerText = 'PUPDATE'
        updateButton.addEventListener('click', () => {showEditForm(dog)},)
            
        let dogListItem = document.createElement('li')
        dogListItem.setAttribute('id', 'dogListItem')

        idNameWrapper.appendChild(dogID)
        idNameWrapper.appendChild(dogName)
        dogListItem.appendChild(idNameWrapper)
        dogListItem.appendChild(dogBreed)
        dogListItem.appendChild(dogAge)
        dogListItem.appendChild(deleteButton)
        dogListItem.appendChild(updateButton)
        container.appendChild(dogListItem)
    })
}