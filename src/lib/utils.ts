import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string to a more readable format
 */
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return new Date(dateString).toLocaleDateString(undefined, options);
}

/**
 * Calculate average rating from an array of reviews
 * If no reviews, return the original rating of the movie
 * @param ratings Array of review ratings
 * @param originalRating Original rating of the movie before any reviews
 * @returns Calculated rating
 */
export function calculateAverageRating(ratings: number[], originalRating?: number): number {
  // When there are no user reviews, always return the original rating
  if (!ratings || ratings.length === 0) {
    return originalRating !== undefined ? originalRating : 0;
  }
  
  // If we have both user reviews and an original rating, calculate a weighted average
  if (originalRating !== undefined) {
    // Original rating has the weight of 2 reviews
    const weightedOriginal = originalRating * 2;
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return parseFloat(((sum + weightedOriginal) / (ratings.length + 2)).toFixed(1));
  }
  
  // If we only have user reviews (no original rating)
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return parseFloat((sum / ratings.length).toFixed(1));
}
