import { SearchBar } from "@/components/SearchBar";
import { FilterSidebar } from "@/components/FilterSidebar";
import { NootropicCard } from "@/components/NootropicCard";
import { NootropicStack } from "@/components/NootropicStack";
import { CreateStackDialog } from "@/components/CreateStackDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

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

// Updated mock stacks with ratings
const initialMockStacks = [
  {
    name: "Focus Stack",
    components: ["Caffeine", "L-Theanine", "Alpha GPC"],
    benefits: ["Enhanced focus", "Reduced jitters", "Improved memory"],
    description: "A classic stack for improved focus and productivity without the common side effects of caffeine alone.",
    imageUrl: "/placeholder.svg",
    rating: 4.5,
    totalRatings: 128
  },
  {
    name: "Memory Stack",
    components: ["Piracetam", "CDP-Choline", "Lion's Mane"],
    benefits: ["Better memory retention", "Enhanced learning", "Neuroprotection"],
    description: "Comprehensive stack designed to optimize memory formation and recall while supporting brain health.",
    imageUrl: "/placeholder.svg",
    rating: 4.2,
    totalRatings: 95
  },
  {
    name: "Mood Stack",
    components: ["Rhodiola Rosea", "L-Tyrosine", "B-Complex"],
    benefits: ["Mood enhancement", "Stress reduction", "Mental clarity"],
    description: "A balanced combination for mood optimization and stress management.",
    imageUrl: "/placeholder.svg",
    rating: 4.7,
    totalRatings: 156
  }
];

const Index = () => {
  const [stacks, setStacks] = useState(initialMockStacks);
  const [sortBy, setSortBy] = useState<"recent" | "rating">("recent");

  const handleCreateStack = (newStack: {
    name: string;
    components: string[];
    benefits: string[];
    description: string;
  }) => {
    const stackWithDefaults = {
      ...newStack,
      imageUrl: "/placeholder.svg",
      rating: 0,
      totalRatings: 0,
    };
    setStacks(prev => [stackWithDefaults, ...prev]);
  };

  const sortedStacks = [...stacks].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0; // Keep original order for "recent"
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto py-16 text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">
            Nootropics Database
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore and learn about cognitive enhancement supplements and stacks
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
          <Tabs defaultValue="nootropics" className="mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="nootropics">Individual Nootropics</TabsTrigger>
              <TabsTrigger value="stacks">Stacks</TabsTrigger>
            </TabsList>
            <TabsContent value="nootropics">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockNootropics.map((nootropic, index) => (
                  <NootropicCard key={index} {...nootropic} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="stacks">
              <div className="flex justify-between items-center mb-6">
                <CreateStackDialog onStackCreate={handleCreateStack} />
                <select
                  className="border rounded-md px-3 py-2"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "recent" | "rating")}
                >
                  <option value="recent">Most Recent</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedStacks.map((stack, index) => (
                  <NootropicStack key={index} {...stack} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Index;
