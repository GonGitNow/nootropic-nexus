import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Star } from "lucide-react";

interface NootropicStackProps {
  name: string;
  components: string[];
  benefits: string[];
  description: string;
  imageUrl?: string;
  rating?: number;
  totalRatings?: number;
}

export const NootropicStack = ({ 
  name, 
  components, 
  benefits, 
  description, 
  imageUrl,
  rating = 0,
  totalRatings = 0 
}: NootropicStackProps) => {
  const [currentRating, setCurrentRating] = useState(rating);
  const [ratingCount, setRatingCount] = useState(totalRatings);

  const handleRating = (newRating: number) => {
    setCurrentRating((prevRating) => {
      const updatedRating = (prevRating * ratingCount + newRating) / (ratingCount + 1);
      return Number(updatedRating.toFixed(1));
    });
    setRatingCount(prev => prev + 1);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 animate-fade-in">
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 cursor-pointer ${
                    star <= Math.round(currentRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleRating(star)}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500 whitespace-nowrap min-w-[80px]">
              ({currentRating.toFixed(1)}) {ratingCount}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {imageUrl && (
          <div className="mb-4">
            <img src={imageUrl} alt={name} className="w-full h-32 object-cover rounded-md" />
          </div>
        )}
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm text-gray-500">Components:</h4>
            <ul className="list-disc list-inside space-y-1">
              {components.map((component, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {component}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm text-gray-500">Benefits:</h4>
            <ul className="list-disc list-inside space-y-1">
              {benefits.map((benefit, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};