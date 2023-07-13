const form = document.getElementById('loginForm')

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const data = new FormData(form)
    const formData = {}
    for (const [name, value] of data.entries()) {
        formData[name] = value
    }
    fetch('/api/sessions/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData),
    }).then(resp => resp.json())
        .then(resp => {
            if (resp.status === 'success') {
                window.location.replace('/profile');
            } else {
                alert('Error: ' + resp.status)
            }
        })
        .catch((error) => {
            alert('Hubo un error: ' + error.message)
        })

})