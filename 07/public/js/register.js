const form = document.getElementById('registerForm')

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const data = new FormData(form)
    const formData = {}
    for (const [name, value] of data.entries()) {
        formData[name] = value
    }
    fetch('/api/sessions/register', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData),
    }).then(resp => resp.json())
        .then(resp => {
            if (resp.status === 'success') {
                alert(resp.message)
            } else {
                alert('Error: ' + resp.message)
            }
        })
        .catch((error) => {
            alert('Error: ' + error.message)
        })

})
