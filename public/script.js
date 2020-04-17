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

/************* All dogs-list ***************/

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

/****************************ADD DOGS*********************/

function addDogFromForm(event){
    event.preventDefault()
    let inputName = document.getElementById('inputName')
    let inputBreed = document.getElementById('inputBreed')
    let inputAge = document.getElementById('inputAge')

    let data = {
        "name": inputName.value,
        "breed": inputBreed.value,
        "age": inputAge.value
    }

    if((inputName.value === "")||(inputBreed.value === "")||(inputAge.value === "")){
        if(inputName.value === ""){
            inputName.placeholder = 'DOGGO NEEDS NAME!'
        }
        if (inputBreed.value === ""){
            inputBreed.value = 'Blandis'
        }
        if (inputAge.value === ""){
            inputAge.placeholder = 'DOGGOS AGE PLS?'
        }
    }
    else{
        fetch(`http://localhost:5000/api/dogs/`,{
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        }, fetchAllDogs())
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', JSON.stringify(response)))
        
        fetchAllDogs()

        inputName.value = ''
        inputName.placeholder= 'Name'
        inputBreed.value = ''
        inputBreed.placeholder ='Breed'
        inputAge.value = ''
        inputAge.placeholder = 'Age'
    }
}

/******************** EDIT DOG FUNCTIONS *****************/

function showEditForm(dog){

    const backgroundDiv = document.createElement('div')
    backgroundDiv.setAttribute('id', 'background')
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

    let submitUpdateButton = document.createElement('button')
    //submitUpdateButton.type = "button"
    submitUpdateButton.innerText = "yes, PUPDATE!"
    submitUpdateButton.addEventListener('click', () => {
        sendUpdate(dog, updateName, updateBreed, updateAge, divEditForm)
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

    if((updateName.value === "")||(updateBreed.value === "")||(updateAge.value === "")){
        if(updateName.value === ""){
            updateName.placeholder = 'DOGGO NEEDS NAME!'
        }
        if (updateBreed.value === ""){
            updateBreed.value = 'Blandis'
        }
        if (updateAge.value === ""){
            updateAge.placeholder = 'DOGGOS AGE PLS?'
        }
    }
    else {
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
        
        backgroundDiv = document.getElementById('clickBackground')
        removeEditDiv(backgroundDiv)
        fetchAllDogs()
    }
}

/******************** SPECIFIC DOG BY ID - FUNCTIONS *****************/

function showSpecificDogById(){
    const id = document.getElementById('idInput')
    if(id.value === ""){
        id.placeholder = "WE REALLY NEED ID"
    }
    else{
        fetch(`http://localhost:5000/api/dogs/${id.value}`). then((response) => {
            if(response.status === 404){
                printSpecificDog()
            }else{
                return response.json()
            }
        }).then((dogs) => {
            printSpecificDog(dogs)
        })
    }
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
            fetch(`/api/dogs/${dog.id}`, {method: 'DELETE'}, fetchAllDogs(), specUserCont.innerHTML="")
        });

        let updateButton = document.createElement('button')
        updateButton.innerText = 'PUPDATE'
        updateButton.addEventListener('click', () => {showEditForm(dog)})

        let closeButton = document.createElement('button')
        closeButton.innerText = 'Put away'
        closeButton.addEventListener('click', () => {specUserCont.innerHTML=""})

        let dogListItem = document.createElement('li')
        dogListItem.setAttribute('id', 'dogListItem')

        idNameWrapper.appendChild(dogID)
        idNameWrapper.appendChild(dogName)
       
        dogListItem.appendChild(idNameWrapper)
        dogListItem.appendChild(dogBreed)
        dogListItem.appendChild(dogAge)
        dogListItem.appendChild(deleteButton)
        dogListItem.appendChild(updateButton)
        dogListItem.appendChild(closeButton)
        specUserCont.appendChild(dogListItem)
    }else{
        const errorResponse = document.createElement('h2')
        errorResponse.innerText = 'NO DOGGO FOUND'
        specUserCont.appendChild(errorResponse)
    }
}