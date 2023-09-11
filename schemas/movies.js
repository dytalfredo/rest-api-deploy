import z from 'zod' // PARA VALIDAR FORMULARIO E INPUTS

const movieShema = z.object({
  title: z.string({
    invalid_type_error: 'Movie tittle must be a string',
    required_error: 'Movile tittle is required'
  }),
  year: z.number().int().min(1900).max(2023),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10),
  poster: z.string().url().endsWith('.jpg'),
  genre: z.array(z.enum(['Crime', 'Drama', 'Action']))

})

export function validateMovieRequestBody (object) {
  console.log(`Este es el esquema dentro del movies${movieShema}`)
  return movieShema.safeParse(object)
}

export function validatePartialMovie (object) {
  return movieShema.partial().safeParse(object)
}
