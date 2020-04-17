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
    }else{
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