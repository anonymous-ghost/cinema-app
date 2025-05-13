import { Film } from "../types";

/**
 * Сортировка фильмов: сначала новые фильмы (isNew: true), затем по году (новые сначала)
 * @param films Массив фильмов для сортировки
 * @returns Отсортированный массив фильмов
 */
export const sortFilms = (films: Film[]): Film[] => {
  return [...films].sort((a, b) => {
    // Сначала сортировка по isNew (новые фильмы первыми)
    if (a.isNew && !b.isNew) return -1;
    if (!a.isNew && b.isNew) return 1;
    
    // Затем сортировка по году (новые фильмы первыми)
    return b.year - a.year;
  });
}; 