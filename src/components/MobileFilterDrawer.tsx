
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Filter, Search, X } from "lucide-react";

interface MobileFilterDrawerProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedSubcategory: string;
  onSubcategoryChange: (subcategory: string) => void;
  selectedConcern: string;
  onConcernChange: (concern: string) => void;
  selectedKnowledgeSystem: string;
  onKnowledgeSystemChange: (system: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  allCategories: string[];
  availableSubcategories: string[];
  allConcerns: string[];
  knowledgeSystems: any[];
  onClearFilters: () => void;
}

const MobileFilterDrawer = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedSubcategory,
  onSubcategoryChange,
  selectedConcern,
  onConcernChange,
  selectedKnowledgeSystem,
  onKnowledgeSystemChange,
  sortBy,
  onSortChange,
  allCategories,
  availableSubcategories,
  allConcerns,
  knowledgeSystems,
  onClearFilters
}: MobileFilterDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedCategory !== "all") count++;
    if (selectedSubcategory !== "all") count++;
    if (selectedConcern !== "all") count++;
    if (selectedKnowledgeSystem !== "all") count++;
    if (searchQuery) count++;
    return count;
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {getActiveFiltersCount() > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
              {getActiveFiltersCount()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filter Products</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 mt-6">
          {/* Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Search Products</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {allCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Subcategory */}
          {availableSubcategories.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Subcategory</label>
              <Select value={selectedSubcategory} onValueChange={onSubcategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subcategory" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subcategories</SelectItem>
                  {availableSubcategories.map((subcategory) => (
                    <SelectItem key={subcategory} value={subcategory}>
                      {subcategory}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Concern */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Health Concern</label>
            <Select value={selectedConcern} onValueChange={onConcernChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select concern" />
              </SelectTrigger>
              <SelectContent>
                {allConcerns.map((concern) => (
                  <SelectItem key={concern} value={concern}>
                    {concern === "all" ? "All Concerns" : concern}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Knowledge System */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Knowledge System</label>
            <Select value={selectedKnowledgeSystem} onValueChange={onKnowledgeSystemChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select system" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Systems</SelectItem>
                {knowledgeSystems.map((system) => (
                  <SelectItem key={system.name} value={system.name}>
                    {system.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Sort By</label>
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="price-low">Price (Low to High)</SelectItem>
                <SelectItem value="price-high">Price (High to Low)</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="stock">Stock Level</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="w-full"
            >
              <X className="w-4 h-4 mr-2" />
              Clear All Filters
            </Button>
            <SheetClose asChild>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Apply Filters
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilterDrawer;
