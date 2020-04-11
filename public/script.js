window.addEventListener('load', init);

function init(){
    fetchAPI()
}

function fetchAPI(){
    fetch("http://localhost:5000/dogs").then((response) => {
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
        let dogBreed = document.createElement('h5')
        dogBreed.innerText = dog.breed
        let dogAge = document.createElement('h5')
        dogAge.innerText = `Ålder: ${dog.age}år`
        let deleteButton = document.createElement('button')
        deleteButton.innerText = 'Delete'
        deleteButton.addEventListener('click',() => {
            fetch(`/dogs/${dog.id}`, {method: 'DELETE'}, updateList())
        });

        

        let dogListItem = document.createElement('li')
        dogListItem.appendChild(dogName)
        dogListItem.appendChild(dogBreed)
        dogListItem.appendChild(dogAge)
        dogListItem.appendChild(deleteButton)

        container.appendChild(dogListItem)
    })
}

 function updateList(event){
     console.log('PUPDATE PLS!')
    const ul = document.querySelector('ul')
    while( ul.firstChild ){
        ul.removeChild(ul.firstChild );
    }
    fetchAPI()
} 