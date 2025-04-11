import { Star, StarHalf } from "lucide-react";

interface RatingStarsProps {
  rating: number; // from 0 to 5
}

export function RatingStars({ rating }: RatingStarsProps) {
  const fullStars = Math.round(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-1">
      {Array(fullStars).fill(0).map((_, i) => (
        <Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
      ))}
      {hasHalfStar && (
        <StarHalf fill="currentColor" stroke="none" className="w-5 h-5 fill-yellow-400" />
      )}
     {Array(emptyStars).fill(0).map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 fill-white/70 stroke-yellow-400" />
      ))}
    </div>
  );
}
