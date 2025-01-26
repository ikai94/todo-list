import {z} from 'zod'

const baseUrl = 'http://localhost:5000';

const TodosDtoSchema = z.object({
  id: z.number(),
  text: z.string(),
  checked: z.boolean(),
  themeId: z.number(),
});

export const TodoDtoSchema = z.object({
  id: z.number(),
  text: z.string(),
  todo: z.array(TodosDtoSchema),
})

export const apiTodos = {
 getTheme: async (themeId:number) => {
   return await fetch(`${baseUrl}/themes/${themeId}`).then(res => res.json()).then(data => {
     return TodoDtoSchema.parse(data)
   })
 }
}