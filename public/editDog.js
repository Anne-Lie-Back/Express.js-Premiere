/******************** EDIT DOG FUNCTIONS (PUT dog)*****************/

function showEditForm(dog){

    const backgroundDiv = document.createElement('div')
    backgroundDiv.setAttribute('id', 'clickBackground')
    backgroundDiv.addEventListener('click', () => {
        removeEditDiv(backgroundDiv)
    })

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

function removeEditDiv(backgroundDiv){
    backgroundDiv.parentNode.removeChild(backgroundDiv)
}