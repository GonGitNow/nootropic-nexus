import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NootropicCardProps {
  name: string;
  category: string;
  benefits: string[];
  imageUrl?: string;
}

export const NootropicCard = ({ name, category, benefits, imageUrl }: NootropicCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 animate-fade-in">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
          <span className="text-sm px-3 py-1 bg-secondary rounded-full">{category}</span>
        </div>
      </CardHeader>
      <CardContent>
        {imageUrl && (
          <div className="mb-4">
            <img src={imageUrl} alt={name} className="w-full h-32 object-cover rounded-md" />
          </div>
        )}
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-gray-500">Key Benefits:</h4>
          <ul className="list-disc list-inside space-y-1">
            {benefits.slice(0, 3).map((benefit, index) => (
              <li key={index} className="text-sm text-gray-600">
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};