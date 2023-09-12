import { MovieModel } from '../models/movies.js'
import { validateMovieRequestBody, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params

    const movie = await MovieModel.getById({ id })
    console.log(movie)
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie no existe' })
  }

  static async create (req, res) {
    const result = validateMovieRequestBody(req.body)
    if (result.error) {
      // 422 bad request enviado mal los datos
      return res.status(422).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = await MovieModel.create({ input: result.data })

    res.status(201).json(newMovie)
  }

  static async delete (req, res) {
    const { id } = req.params
    const result = await MovieModel.delete({ id })
    if (result === false) {
      return res.status(404).json({ message: 'Movie no found' })
    }
    return res.json({ message: 'Movie Delete' })
  }

  static async update (req, res) {
    const result = validatePartialMovie(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updateMovie = await MovieModel.update({ id, input: result.data })
    if (updateMovie === false) return res.status(404).json({ message: 'Movie no found' })

    res.status(200).json(updateMovie)
  }
}
