const express = require('express')
const crypto = require('node:crypto')
const cors = require('cors')
const movies = require('./movies.json')
const { validateMovieRequestBody, validatePartialMovie } = require('./schemas/movies')

const PORT = process.env.PORT ?? 3000
const app = express()
app.disable('x-powered-by')

app.use(express.json())
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:3030',
      'http://localhost:8080',
      'http://localhost:3000',
      'http://localhost:1234'
    ]
    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }
    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('No por CORS'))
  }
}
))
app.get('/', (req, res) => {
  res.json({ message: 'hola mundo' })
})

app.get('/movies', (req, res) => {
  // const origin = req.header('origin')
  // console.log('INTENTO ESTO', origin)

  // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
  //   res.header('Access-Control-Allow-Origin', origin)
  //   // res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  // }
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLocaleLowerCase())
    )

    if (filteredMovies.length > 0) {
      console.log(filteredMovies.length)
      return res.json(filteredMovies)
    }
    return res.json({ message: 'No hay peliculas con este genero' })
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie no existe' })
})

app.post('/movies', (req, res) => {
  // console.log(req.body)

  const result = validateMovieRequestBody(req.body)
  if (result.error) {
    // 422 bad request enviado mal los datos
    return res.status(422).json({ error: JSON.parse(result.error.message) })
  }
  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data

  }
  console.log(newMovie)

  // estamos guardando el estado de la aplicacion en memoria
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

app.delete('/movies/:id', (req, res) => {
  // const origin = req.header('origin')
  // console.log('INTENTO ESTO', origin)

  // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
  //   res.header('Access-Control-Allow-Origin', origin)
  // }
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (movieIndex === -1) { return res.status(404).json({ message: 'Movie no found' }) }
  console.log('ARTICULO BORRADO', movies[movieIndex].title)
  movies.splice(movieIndex, 1)

  return res.json({ message: 'Movie Delete' })
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (movieIndex === -1) return res.status(404).json({ message: 'Movie no found' })

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }
  movies[movieIndex] = updateMovie

  res.status(200).json(updateMovie)
})

// app.options('/movies/:id', (req, res) => {
//   const origin = req.header('origin')
//   console.log('INTENTO ESTO EN OPTIONS', origin)

//   if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
//     res.header('Access-Control-Allow-Origin', origin)
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
//   }
//   res.send(200)
// })

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: http://localhost:${PORT}`)
})
