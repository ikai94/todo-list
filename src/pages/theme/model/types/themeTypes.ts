export type TypeThemeId = number;

export type TypeTheme = {
  id: number;
  text: string;
}

export type TypeThemesSchema = {
  entities: Record<TypeThemeId, TypeTheme>;
  ids: TypeThemeId[]
  selectedThemeId: TypeThemeId | undefined;
  error: string | undefined
  fetchThemeStatus: "idle" | "pending" | "success" | "failure";
}