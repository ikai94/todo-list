import { baseApi } from 'src/shared/api/baseApi';
import { z } from 'zod';
import { TypeTheme, TypeThemeId } from '../types/themeTypes';

const baseUrl = 'http://localhost:5000';

const ThemeDtoSchema = z.object({
  id: z.number(),
  text: z.string(),
});

export const apiThemes = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTheme: build.mutation<void, string>({
      query: (text) => ({
        method: 'POST',
        url: `/themes`,
        body: { text },
      }),
      invalidatesTags: ['Theme'],
    }),
    getThemes: build.query<TypeTheme[], void>({
      query: () => '/themes',
      providesTags: ['Theme'],
      transformResponse: (res: unknown) => ThemeDtoSchema.array().parse(res),
    }),
    deleteTheme: build.mutation<void, TypeThemeId>({
      query: (themeId) => ({ method: 'DELETE', url: `/themes/${themeId}` }),
      invalidatesTags: ['Theme'],
    }),
  }),
  overrideExisting: true,
});

// export const apiThemes = {
//   createTheme: async (theme: string) => {
//     return await fetch(`${baseUrl}/themes`, {
//       method: 'POST',
//       body: JSON.stringify({ text: theme }),
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//     });
//   },
//   getThemes: async () => {
//     return await fetch(`${baseUrl}/themes`)
//       .then((res) => res.json())
//       .then((res) => {
//         return ThemeDtoSchema.array().parse(res);
//       });
//   },
//   deleteTheme: async (themeId: number) => {
//     return await fetch(`${baseUrl}/themes/${themeId}`, {
//       method: 'DELETE',
//     });
//   },
// };
