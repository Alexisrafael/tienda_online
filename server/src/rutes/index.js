const { Router } = require('express');
const {getConjuntos, postConjuntos } = require("./conjuntos")

const index = Router()

index.get('/', getConjuntos)
index.post('/crear', postConjuntos)

module.exports = index