import { z } from 'zod';

const baseUrl = 'http://localhost:5000';

const ThemeDtoSchema = z.object({
  id: z.number(),
  text: z.string(),
});

export const apiThemes = {
  getThemes: async () => {
    return await fetch(`${baseUrl}/themes`)
      .then((res) => res.json())
      .then((res) => {
        return ThemeDtoSchema.array().parse(res);
      });
  },
  deleteTheme: async (themeId: string) => {
    return await fetch(`${baseUrl}/themes/${themeId}`, {
      method: 'DELETE',
    }).then((res) => res.json());
  },
};
