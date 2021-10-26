console.log("testyyy")

const button = document.getElementById('b1')

button.addEventListener(click, () => {
    rollbar.critical('error')
})

const form = document.querySelector('form')
const nameInput = document.querySelector('nameInput')
const foodInput = document.querySelector('foodInput')


form.addEventListener('submit', (e) => {
    e.preventDefault()

    const foodObj = {
        name: nameInput.value,
        food: foodInput.value

    }
    
    
    axios.post('/api/favorites',foodObj).then(res => {
        alert('Successfully Submitted')
    })


})

