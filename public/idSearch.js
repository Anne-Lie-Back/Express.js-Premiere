/******************** SPECIFIC DOG BY ID - FUNCTIONS (GET by ID) *****************/

function showSpecificDogById(){
    const id = document.getElementById('idInput')

    if(id.value === ""){
        id.placeholder = "WE REALLY NEED ID"
    }
    else{
        fetch(`http://localhost:5000/api/dogs/${id.value}`). then((response) => {
            if(response.status === 404){
                printSpecificDog()
            }
            else{
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

        let closeButton = document.createElement('button')
        closeButton.innerText = 'Put away'
        closeButton.addEventListener('click', () => {specUserCont.innerHTML=""})

        let deleteButton = document.createElement('button')
        deleteButton.innerText = 'Delete'
        deleteButton.addEventListener('click',() => {
            fetch(`/api/dogs/${dog.id}`, {method: 'DELETE'}, fetchAllDogs(), specUserCont.innerHTML="")
        });

        let updateButton = document.createElement('button')
        updateButton.innerText = 'PUPDATE'
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
        dogListItem.appendChild(closeButton)
        specUserCont.appendChild(dogListItem)
    }
    else{
        const errorResponse = document.createElement('h3')
        errorResponse.innerText = 'NO DOGGO FOUND'
        specUserCont.appendChild(errorResponse)
    }
}