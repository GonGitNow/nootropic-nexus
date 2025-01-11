import { SearchBar } from "@/components/SearchBar";
import { FilterSidebar } from "@/components/FilterSidebar";
import { NootropicCard } from "@/components/NootropicCard";

// This will be replaced with actual data from MongoDB
const mockNootropics = [
  {
    name: "Piracetam",
    category: "Racetams",
    benefits: ["Memory enhancement", "Cognitive function", "Neuroprotection"],
    imageUrl: "/placeholder.svg"
  },
  {
    name: "Lion's Mane",
    category: "Adaptogens",
    benefits: ["Neural growth", "Memory improvement", "Anti-inflammatory"],
    imageUrl: "/placeholder.svg"
  },
  {
    name: "Alpha GPC",
    category: "Cholinergics",
    benefits: ["Memory enhancement", "Focus improvement", "Brain health"],
    imageUrl: "/placeholder.svg"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto py-16 text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">
            Nootropics Database
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore and learn about cognitive enhancement supplements
          </p>
          <div className="flex justify-center">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        <FilterSidebar />
        
        <main className="flex-1 container py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockNootropics.map((nootropic, index) => (
              <NootropicCard key={index} {...nootropic} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;