window.addEventListener('load', init);

function init(){
    fetchAPI()
    const searchButton = document.getElementById('idSearch')
    searchButton.addEventListener('click', showSpecificDogById)
}

function fetchAPI(){
    fetch("http://localhost:5000/api/dogs").then((response) => {
        return response.json()
    }).then((dogs) => {
        printAllDogs(dogs)
    })
}

function printAllDogs(dogs){
    let container = document.getElementById('listOfDogs')

    dogs.forEach(dog => {
        let dogName = document.createElement('h3')
        dogName.innerText = dog.name

        let dogID = document.createElement('h5')
        dogID.innerText = `Id: ${dog.id}`

        let dogBreed = document.createElement('h5')
        dogBreed.innerText = dog.breed

        let dogAge = document.createElement('h5')
        dogAge.innerText = `Ålder: ${dog.age}år`

        let deleteButton = document.createElement('button')
        deleteButton.innerText = 'Delete'
        deleteButton.addEventListener('click',() => { 
            fetch(`/api/dogs/${dog.id}`, {method: 'DELETE'}, updateList())
        });

        let updateButton = document.createElement('button')
        updateButton.innerText = 'UPDATE'
        updateButton.addEventListener('click', () => {appendEditForm(dog)})
            

        let dogListItem = document.createElement('li')
        dogListItem.setAttribute('id', 'dogListItem')
        dogListItem.appendChild(dogName)
        dogListItem.appendChild(dogID)
        dogListItem.appendChild(dogBreed)
        dogListItem.appendChild(dogAge)
        dogListItem.appendChild(deleteButton)
        dogListItem.appendChild(updateButton)
        container.appendChild(dogListItem)
    })
}

function appendEditForm(dog){

    let updateName = document.createElement('input')
    updateName.type = "text"
    updateName.name = "name"
    updateName.value = dog.name
    updateName.placeholder = "Name"

    let updateBreed = document.createElement('input')
    updateBreed.type = "text"
    updateBreed.name = "breed"
    updateBreed.value = dog.breed
    updateBreed.placeholder = "Breed"

    let updateAge = document.createElement('input')
    updateAge.type = "number"
    updateAge.name = "age"
    updateAge.value = dog.age
    updateAge.placeholder = "Age"

    let submitUpdateButton = document.createElement('input')
    submitUpdateButton.type = "button"
    submitUpdateButton.value = "yes, PUPDATE!"
    submitUpdateButton.addEventListener('click', () => {
        sendUpdate(dog, updateName, updateBreed, updateAge, divEditForm)
    });
        
    const divEditForm = document.getElementById('editForm')
    divEditForm.appendChild(updateName)
    divEditForm.appendChild(updateBreed)
    divEditForm.appendChild(updateAge)
    divEditForm.appendChild(submitUpdateButton)
}

function sendUpdate(dog, updateName, updateBreed, updateAge, divEditForm){
    let data = {
        "name": updateName.value,
        "breed": updateBreed.value,
        "age": updateAge.value
    }
    fetch(`http://localhost:5000/api/dogs/${dog.id}`,{
        method: 'PUT',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', JSON.stringify(response)))

    while( divEditForm.firstChild ){
        divEditForm.removeChild(divEditForm.firstChild );
    }

    updateList()
}

function showSpecificDogById(){
    const id = document.getElementById('idInput').value
    fetch(`http://localhost:5000/api/dogs/${id}`). then((response) => {
        if(response.status === 404){
            printSpecificDog()
        }else{
            return response.json()
        }
    }).then((dogs) => {
        printSpecificDog(dogs)
    })
}

function printSpecificDog(dog){
    const specUserCont = document.getElementById('showSpecDog')
    specUserCont.innerHTML = ""
    if(dog){
        let dogName = document.createElement('h3')
        dogName.innerText = dog.name
        let dogID = document.createElement('h5')
        dogID.innerText = `Id: ${dog.id}`
        let dogBreed = document.createElement('h5')
        dogBreed.innerText = dog.breed
        let dogAge = document.createElement('h5')
        dogAge.innerText = `Ålder: ${dog.age}år`
        let deleteButton = document.createElement('button')
        deleteButton.innerText = 'Delete'
        deleteButton.addEventListener('click',() => {
            fetch(`/api/dogs/${dog.id}`, {method: 'DELETE'}, updateList())
        });

        let updateButton = document.createElement('button')
        updateButton.innerText = 'UPDATE'
        updateButton.addEventListener('click', () => {appendEditForm(dog)})

        let dogListItem = document.createElement('li')
        dogListItem.setAttribute('id', 'dogListItem')
        dogListItem.appendChild(dogName)
        dogListItem.appendChild(dogID)
        dogListItem.appendChild(dogBreed)
        dogListItem.appendChild(dogAge)
        dogListItem.appendChild(deleteButton)
        dogListItem.appendChild(updateButton)
        specUserCont.appendChild(dogListItem)
    }else{
        const errorResponse = document.createElement('h1')
        errorResponse.innerText = 'NO DOGGO FOUND'
        specUserCont.appendChild(errorResponse)
    }
}

function updateList(){
     console.log('PUPDATE PLS!')
    const ul = document.querySelector('ul')
    while( ul.firstChild ){
        ul.removeChild(ul.firstChild );
    }
    fetchAPI()
} 