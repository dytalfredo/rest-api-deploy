import { Router } from 'express'
// import { validateMovieRequestBody, validatePartialMovie } from '../schemas/movies.js'
// import { randomUUID } from 'node:crypto'
import { MovieModel } from '../models/movies.js'

export const moviesRouter = Router()

moviesRouter.get('/', async (req, res) => {
  const { genre } = req.query
  const movies = await MovieModel.getAll({ genre })
  res.json(movies)
})

moviesRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const movie = MovieModel.getById(id)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie no existe' })
})

// moviesRouter.post('/', (req, res) => {
//   const result = validateMovieRequestBody(req.body)
//   if (result.error) {
//     // 422 bad request enviado mal los datos
//     return res.status(422).json({ error: JSON.parse(result.error.message) })
//   }
//   const newMovie = {
//     id: randomUUID(),
//     ...result.data

//   }
//   console.log(newMovie)

//   movies.push(newMovie)
//   res.status(201).json(newMovie)
// })

// moviesRouter.delete('/:id', (req, res) => {
//   const { id } = req.params
//   const movieIndex = movies.findIndex(movie => movie.id === id)
//   if (movieIndex === -1) { return res.status(404).json({ message: 'Movie no found' }) }
//   console.log('ARTICULO BORRADO', movies[movieIndex].title)
//   movies.splice(movieIndex, 1)

//   return res.json({ message: 'Movie Delete' })
// })

// moviesRouter.patch('/:id', (req, res) => {
//   const result = validatePartialMovie(req.body)
//   if (!result.success) {
//     return res.status(400).json({ error: JSON.parse(result.error.message) })
//   }
//   const { id } = req.params
//   const movieIndex = movies.findIndex(movie => movie.id === id)
//   if (movieIndex === -1) return res.status(404).json({ message: 'Movie no found' })

//   const updateMovie = {
//     ...movies[movieIndex],
//     ...result.data
//   }
//   movies[movieIndex] = updateMovie

//   res.status(200).json(updateMovie)
// })
