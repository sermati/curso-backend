import { Router } from 'express'
import userModel from '../dao/models/user.model.js'

const router = Router()

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        // Nos fijamos si existe el usuario con ese email
        const user = await userModel.findOne({ email })
        if (!user) {
            res.status(400).send({ status: "error", message: "El usuario no existe" })
        }
        // Nos fijamos si es correcta la contraseña
        if (user.password !== password) {
            res.status(400).send({ status: "error", message: "La contraseña es incorrecta" })
        }
        // Asignamos rol si es admin
        let userRole = false
        if (email.includes("admin")) {
            userRole = true
        }
        req.session.user = {
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: userRole
        }
        res.send({ status: "success", payload: req.session.user, message: "Primer logueo realizado" })
    } catch (error) {
        res.status(400).send({ status: "error", message: "Error: " + error.message })
    }
})

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    // Nos fijamos si existe un usuario con ese email
    const exists = await userModel.findOne({ email })
    if (exists) {
        return res.status(400).send({ status: "error", message: "Ya existe un usuario con este email" })
    }
    const user = {
        firstName,
        lastName,
        email,
        password // sin hashear por ahora...
    }
    await userModel.create(user)
    res.status(201).send({ status: "success", message: "Usuario registrado" })
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: "error", error: "No se pudo cerrar la sesión" })
        res.redirect('/login')
    })
})

export default router