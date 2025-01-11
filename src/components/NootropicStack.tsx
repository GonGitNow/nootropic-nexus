import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NootropicStackProps {
  name: string;
  components: string[];
  benefits: string[];
  description: string;
  imageUrl?: string;
}

export const NootropicStack = ({ name, components, benefits, description, imageUrl }: NootropicStackProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 animate-fade-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-bold">{name}</CardTitle>
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