const socket = io()
let user
let $chatInput = document.getElementById('chatInput')

Swal.fire({
    title: '¡Hola!',
    input: 'text',
    text: 'Ingresa tu nombre',
    inputValidator: (value) => {
        return !value && 'Por favor ingresa un nombre de usuario'
    },
    allowOutsideClick: false
}).then((result) => {
    user = result.value
    let $title = document.getElementById('title')
    $title.innerHTML = `Hola ${user} bienvenido al chat`
    socket.emit('authenticated', user)
})

$chatInput.addEventListener('keyup', evt => {
    if (evt.key === "Enter") {
        if ($chatInput.value.trim().length > 0) {
            socket.emit('message', { user: user, message: $chatInput.value })
            $chatInput.value = ""
        }
    }
})

socket.on('message', data => {
    if (!user) return
    let $messageBox = document.getElementById('messageBox')
    let messages = ""
    data.forEach(message => {
        messages += `${message.user} dice: ${message.message}<br/>`
    })
    $messageBox.innerHTML = messages
})

socket.on('newUserConnected', data => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `${data} entró al chat`,
        showConfirmButton: false,
        timer: 5000
    })
})