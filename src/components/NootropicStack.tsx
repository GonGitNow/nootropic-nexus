import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star, StarHalf } from "lucide-react";
import { Stack } from "@/lib/api";

interface NootropicStackProps {
  stack: Stack;
  onRate?: (rating: number, review?: string) => Promise<void>;
}

const RatingStars = ({ rating, totalRatings }: { rating: number; totalRatings?: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="w-4 h-4 text-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
      {totalRatings !== undefined && (
        <span className="ml-2 text-sm text-gray-600">({totalRatings})</span>
      )}
    </div>
  );
};

const StackDialog = ({ stack }: { stack: Stack }) => (
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>{stack.name}</DialogTitle>
      <div className="flex items-center gap-4">
        <RatingStars rating={stack.averageRating} totalRatings={stack.totalRatings} />
        <Badge variant="outline">{stack.components.length} Components</Badge>
      </div>
    </DialogHeader>
    <div className="space-y-6">
      <section>
        <h3 className="font-semibold mb-2">Description</h3>
        <p className="text-gray-600">{stack.description}</p>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Components</h3>
        <div className="space-y-4">
          {stack.components.map((component, index) => {
            const nootropic = typeof component.nootropic === 'string' 
              ? { substanceName: component.nootropic }
              : component.nootropic;
            
            return (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{nootropic.substanceName}</h4>
                    {component.dosage && (
                      <p className="text-sm text-gray-600">
                        Dosage: {component.dosage.amount} {component.dosage.unit}
                      </p>
                    )}
                  </div>
                  {component.timing && (
                    <Badge variant="secondary">{component.timing}</Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {stack.benefits.length > 0 && (
        <section>
          <h3 className="font-semibold mb-2">Benefits</h3>
          <div className="flex flex-wrap gap-2">
            {stack.benefits.map((benefit, index) => (
              <Badge key={`benefit-${index}`} variant="secondary">{benefit}</Badge>
            ))}
          </div>
        </section>
      )}

      {stack.instructions && (
        <section>
          <h3 className="font-semibold mb-2">Instructions</h3>
          <p className="text-gray-600">{stack.instructions}</p>
        </section>
      )}

      {stack.warnings.length > 0 && (
        <section>
          <h3 className="font-semibold mb-2">Warnings</h3>
          <div className="space-y-2">
            {stack.warnings.map((warning, index) => (
              <p key={`warning-${index}`} className="text-red-600">• {warning}</p>
            ))}
          </div>
        </section>
      )}

      <section>
        <h3 className="font-semibold mb-2">Recent Reviews</h3>
        <div className="space-y-4">
          {stack.ratings.slice(0, 3).map((rating, index) => (
            <div key={`rating-${index}`} className="border-l-2 pl-3">
              <div className="flex items-center gap-2">
                <RatingStars rating={rating.rating} />
                <span className="text-sm text-gray-500">
                  {new Date(rating.createdAt).toLocaleDateString()}
                </span>
              </div>
              {rating.review && (
                <p className="mt-1 text-gray-600">{rating.review}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  </DialogContent>
);

export const NootropicStack = ({ stack, onRate }: NootropicStackProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{stack.name}</CardTitle>
                <CardDescription>
                  <RatingStars rating={stack.averageRating} totalRatings={stack.totalRatings} />
                </CardDescription>
              </div>
              <Badge variant="outline">{stack.components.length} Components</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600 line-clamp-2">{stack.description}</p>
              <div className="flex flex-wrap gap-2">
                {stack.benefits.slice(0, 3).map((benefit, index) => (
                  <Badge key={`benefit-${index}`} variant="secondary">{benefit}</Badge>
                ))}
                {stack.benefits.length > 3 && (
                  <Badge variant="secondary">+{stack.benefits.length - 3} more</Badge>
                )}
              </div>
              <Button variant="outline" className="w-full">View Details</Button>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <StackDialog stack={stack} />
    </Dialog>
  );
};