import { randomUUID } from 'node:crypto'
import { readJSON } from '../utils/readJSON.js'
const movies = readJSON('../movies.json')

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      return movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }

  static async getById ({ id }) {
    console.log('comenzo a hacer el getById')
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false
    return movies[movieIndex]
  }

  static async create ({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input

    }
    movies.push(newMovie)
    return newMovie
  }

  static async update ({ id, input }) {
    console.log('comenzo a hacer el Update')
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input
    }

    return movies[movieIndex]
  }

  static async delete ({ id }) {
    console.log('comenzo a hacer el Delete')
    const movieIndex = movies.findIndex(movie => movie.id === id)
    console.log(movieIndex)
    if (movieIndex === -1) return false
    movies.splice(movieIndex, 1)
    return true
  }
}
