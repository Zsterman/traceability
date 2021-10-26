const button = document.getElementById('1')

button.addEventListener(click, () => {
    rollbar.critical('error')
})

