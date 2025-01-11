import { SearchBar } from "@/components/SearchBar";
import { FilterSidebar } from "@/components/FilterSidebar";
import { NootropicCard } from "@/components/NootropicCard";
import { NootropicStack } from "@/components/NootropicStack";
import { CreateStackDialog } from "@/components/CreateStackDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { api, Nootropic, Stack } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [nootropics, setNootropics] = useState<Nootropic[]>([]);
  const [filteredNootropics, setFilteredNootropics] = useState<Nootropic[]>([]);
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"recent" | "rating">("recent");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [nootropicsData, stacksData] = await Promise.all([
          api.nootropics.getAll(),
          api.stacks.getAll()
        ]);
        setNootropics(nootropicsData);
        setFilteredNootropics(nootropicsData);
        setStacks(stacksData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      filterNootropics('', selectedCategories);
      return;
    }

    filterNootropics(query, selectedCategories);
  };

  const handleCategoryFilter = (categories: string[]) => {
    setSelectedCategories(categories);
    filterNootropics('', categories);
  };

  const filterNootropics = (searchTerm: string, categories: string[]) => {
    let filtered = nootropics;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((nootropic) => {
        return (
          nootropic.substanceName.toLowerCase().includes(term) ||
          nootropic.category.some(cat => cat.toLowerCase().includes(term)) ||
          nootropic.benefits.some(benefit => benefit.toLowerCase().includes(term))
        );
      });
    }

    // Apply category filter
    if (categories.length > 0) {
      filtered = filtered.filter((nootropic) =>
        nootropic.category.some(cat => categories.includes(cat))
      );
    }

    setFilteredNootropics(filtered);
  };

  const handleCreateStack = async (stackData: Omit<Stack, '_id' | 'totalRatings' | 'averageRating' | 'ratings' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newStack = await api.stacks.create(stackData);
      setStacks(prev => [newStack, ...prev]);
      toast({
        title: "Success",
        description: "Stack created successfully",
      });
    } catch (error) {
      console.error('Error creating stack:', error);
      toast({
        title: "Error",
        description: "Failed to create stack",
        variant: "destructive",
      });
    }
  };

  const handleRateStack = async (stackId: string, rating: number, review?: string) => {
    try {
      const updatedStack = await api.stacks.rate(stackId, rating, review);
      setStacks(prev => prev.map(stack => 
        stack._id === stackId ? updatedStack : stack
      ));
      toast({
        title: "Success",
        description: "Rating submitted successfully",
      });
    } catch (error) {
      console.error('Error rating stack:', error);
      toast({
        title: "Error",
        description: "Failed to submit rating",
        variant: "destructive",
      });
    }
  };

  const sortedStacks = [...stacks].sort((a, b) => {
    if (sortBy === "rating") {
      return b.averageRating - a.averageRating;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

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
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        <FilterSidebar onCategoryChange={handleCategoryFilter} />
        
        <main className="flex-1 container py-8">
          <Tabs defaultValue="nootropics" className="mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="nootropics">Individual Nootropics</TabsTrigger>
              <TabsTrigger value="stacks">Stacks</TabsTrigger>
            </TabsList>
            <TabsContent value="nootropics">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNootropics.map((nootropic) => (
                  <NootropicCard 
                    key={`nootropic-${nootropic.substanceName}`}
                    {...nootropic}
                  />
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
                {sortedStacks.map((stack) => (
                  <NootropicStack
                    key={stack._id}
                    stack={stack}
                    onRate={(rating, review) => handleRateStack(stack._id, rating, review)}
                  />
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
