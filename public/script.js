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

/************* All dogs-list ***************/

function printAllDogs(dogs){
    let container = document.getElementById('listOfDogs')

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
            fetch(`/api/dogs/${dog.id}`, {method: 'DELETE'}, updateList())
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

/******************** EDIT DOG FUNCTIONS *****************/

function showEditForm(dog){

    const backgroundDiv = document.createElement('div')
    backgroundDiv.addEventListener('click', () => {
        removeEditDiv(backgroundDiv)
    })
    backgroundDiv.setAttribute('id', 'clickBackground')

    const editFormContainer = document.createElement('div')
    editFormContainer.setAttribute('class','container denseContainer')
    editFormContainer.addEventListener('click', (event) => {
        event.stopPropagation()
    })

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
        sendUpdate(dog, updateName, updateBreed, updateAge, divEditForm), 
        removeEditDiv(backgroundDiv)
    });
        
    const divEditForm = document.createElement('div')
    divEditForm.appendChild(updateName)
    divEditForm.appendChild(updateBreed)
    divEditForm.appendChild(updateAge)
    divEditForm.appendChild(submitUpdateButton)

    editFormContainer.appendChild(divEditForm)
    backgroundDiv.appendChild(editFormContainer)
    
    document.querySelector('body').appendChild(backgroundDiv)
}

function removeEditDiv(backgroundDiv){
    backgroundDiv.parentNode.removeChild(backgroundDiv)
    console.log('removed!')
}

function sendUpdate(dog, updateName, updateBreed, updateAge){
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

    updateList()
}

/******************** SPECIFIC DOG BY ID - FUNCTIONS *****************/

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
        let idNameWrapper = document.createElement('div')
        idNameWrapper.setAttribute('class', 'idNameWrapper')

        let dogName = document.createElement('h2')
        dogName.innerText = dog.name
        let dogID = document.createElement('h4')
        dogID.innerText = `Id: ${dog.id}`
        let dogBreed = document.createElement('p')
        dogBreed.innerText = dog.breed
        let dogAge = document.createElement('p')
        dogAge.innerText = `Human years: ${dog.age}`
        let deleteButton = document.createElement('button')
        deleteButton.innerText = 'Delete'
        deleteButton.addEventListener('click',() => {
            fetch(`/api/dogs/${dog.id}`, {method: 'DELETE'}, updateList(), specUserCont.innerHTML="")
        });

        let updateButton = document.createElement('button')
        updateButton.innerText = 'UPDATE'
        updateButton.addEventListener('click', () => {showEditForm(dog)})

        let dogListItem = document.createElement('li')
        dogListItem.setAttribute('id', 'dogListItem')

        idNameWrapper.appendChild(dogID)
        idNameWrapper.appendChild(dogName)
       
        dogListItem.appendChild(idNameWrapper)
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

/***************** Keeps list in DOM up to date ******************/

function updateList(){
     console.log('PUPDATE PLS!')
    const ul = document.querySelector('ul')
    while( ul.firstChild ){
        ul.removeChild(ul.firstChild );
    }
    fetchAPI()
} 