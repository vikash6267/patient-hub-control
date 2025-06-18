
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import EnhancedSearch from "./EnhancedSearch";

interface FilterPanelProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearch: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedSubcategory: string;
  onSubcategoryChange: (value: string) => void;
  selectedConcern: string;
  onConcernChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  allCategories: string[];
  availableSubcategories: string[];
  allConcerns: string[];
  knowledgeSystems: Array<{ name: string; color: string }>;
  selectedKnowledgeSystem: string;
  onKnowledgeSystemChange: (value: string) => void;
}

const FilterPanel = ({
  searchQuery,
  onSearchChange,
  onSearch,
  selectedCategory,
  onCategoryChange,
  selectedSubcategory,
  onSubcategoryChange,
  selectedConcern,
  onConcernChange,
  sortBy,
  onSortChange,
  allCategories,
  availableSubcategories,
  allConcerns,
  knowledgeSystems,
  selectedKnowledgeSystem,
  onKnowledgeSystemChange
}: FilterPanelProps) => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeFilters = [
    { key: 'category', value: selectedCategory, label: selectedCategory !== 'all' ? selectedCategory : null },
    { key: 'subcategory', value: selectedSubcategory, label: selectedSubcategory !== 'all' ? selectedSubcategory : null },
    { key: 'concern', value: selectedConcern, label: selectedConcern !== 'all' ? selectedConcern : null },
    { key: 'knowledge', value: selectedKnowledgeSystem, label: selectedKnowledgeSystem !== 'all' ? selectedKnowledgeSystem : null }
  ].filter(filter => filter.label);

  const clearFilter = (filterKey: string) => {
    switch (filterKey) {
      case 'category':
        onCategoryChange('all');
        onSubcategoryChange('all');
        break;
      case 'subcategory':
        onSubcategoryChange('all');
        break;
      case 'concern':
        onConcernChange('all');
        break;
      case 'knowledge':
        onKnowledgeSystemChange('all');
        break;
    }
  };

  const clearAllFilters = () => {
    onCategoryChange('all');
    onSubcategoryChange('all');
    onConcernChange('all');
    onKnowledgeSystemChange('all');
  };

  return (
    <Card className="border-green-100">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">Filters & Search</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="border-green-200"
          >
            <Filter className="w-4 h-4 mr-2" />
            {filtersOpen ? 'Hide' : 'Show'} Filters
          </Button>
        </div>
        
        {/* Search - Always visible */}
        <div className="w-full max-w-md">
          <EnhancedSearch
            value={searchQuery}
            onChange={onSearchChange}
            onSearch={onSearch}
            placeholder="Search products..."
          />
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-600">Active filters:</span>
            {activeFilters.map((filter) => (
              <Badge
                key={filter.key}
                variant="secondary"
                className="bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer"
                onClick={() => clearFilter(filter.key)}
              >
                {filter.label}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-green-600 hover:text-green-700 text-sm"
            >
              Clear all
            </Button>
          </div>
        )}
      </CardHeader>

      <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                <Select value={selectedCategory} onValueChange={onCategoryChange}>
                  <SelectTrigger className="border-green-200 focus:border-green-500">
                    <SelectValue placeholder="Category" />
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

              {availableSubcategories.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Subcategory</label>
                  <Select value={selectedSubcategory} onValueChange={onSubcategoryChange}>
                    <SelectTrigger className="border-green-200 focus:border-green-500">
                      <SelectValue placeholder="Subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subcategories</SelectItem>
                      {availableSubcategories.map((sub) => (
                        <SelectItem key={sub} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Health Concern</label>
                <Select value={selectedConcern} onValueChange={onConcernChange}>
                  <SelectTrigger className="border-green-200 focus:border-green-500">
                    <SelectValue placeholder="Health Concern" />
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

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Sort By</label>
                <Select value={sortBy} onValueChange={onSortChange}>
                  <SelectTrigger className="border-green-200 focus:border-green-500">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="stock">Stock Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Knowledge Systems */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">Knowledge System</label>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                <Button
                  variant={selectedKnowledgeSystem === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onKnowledgeSystemChange('all')}
                  className={selectedKnowledgeSystem === 'all' ? 'bg-green-600' : 'border-green-200'}
                >
                  All Systems
                </Button>
                {knowledgeSystems.map((system) => (
                  <Button
                    key={system.name}
                    variant={selectedKnowledgeSystem === system.name ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onKnowledgeSystemChange(system.name)}
                    className={selectedKnowledgeSystem === system.name ? 'bg-green-600' : 'border-green-200 text-green-700'}
                  >
                    {system.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default FilterPanel;
