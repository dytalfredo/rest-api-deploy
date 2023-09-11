import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './utils/cors.js'

// import movies from './movies.json' with {type: 'json'} proximamente

// COMO LEER UN JSON EN ESMODULES import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8')) es muy largo, se usa JSON

const PORT = process.env.PORT ?? 3000
const app = express() // BUeno en la mañana me levanto a las 6 de la mañana, hago efercicio
app.disable('x-powered-by')

app.use(json())
app.use(corsMiddleware())
app.get('/', (req, res) => {
  res.json({ message: 'hola mundo' })
})

app.use('/movies', moviesRouter)

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: http://localhost:${PORT}`)
})
