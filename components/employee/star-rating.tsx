"use client"

import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  max?: number;
  className?: string;
}

export function StarRating({ rating, max = 5, className }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className={cn("flex", className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="fill-current h-4 w-4" />
      ))}
      
      {hasHalfStar && (
        <StarHalf key="half" className="fill-current h-4 w-4" />
      )}
      
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="text-muted-foreground/30 h-4 w-4" />
      ))}
    </div>
  );
}