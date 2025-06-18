
import { useState, useEffect, useRef } from "react";
import { Search, X, Clock, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SearchSuggestion {
  id: string;
  text: string;
  type: "product" | "category" | "recent" | "trending";
  category?: string;
}

interface EnhancedSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
}

const EnhancedSearch = ({ value, onChange, onSearch, placeholder = "Search products..." }: EnhancedSearchProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock suggestions - in real app, this would come from API
  const mockSuggestions: SearchSuggestion[] = [
    { id: "1", text: "Ashwagandha", type: "product" },
    { id: "2", text: "Turmeric Curcumin", type: "product" },
    { id: "3", text: "CBD Oil", type: "product" },
    { id: "4", text: "Collagen", type: "product" },
    { id: "5", text: "Vitamin D", type: "trending" },
    { id: "6", text: "Probiotics", type: "trending" },
    { id: "7", text: "Brain Health", type: "category" },
    { id: "8", text: "Joint Support", type: "category" },
    { id: "9", text: "Immune Support", type: "category" },
  ];

  const trendingSearches = ["Ashwagandha", "Turmeric", "Vitamin D", "Probiotics"];

  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (value.length > 0) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6));
    } else {
      setSuggestions([]);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      // Add to recent searches
      const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    onChange(suggestion.text);
    handleSearch(suggestion.text);
  };

  const clearSearch = () => {
    onChange("");
    setShowSuggestions(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(value);
            }
          }}
          placeholder={placeholder}
          className="pl-10 pr-10 border-green-200 focus:border-green-500"
        />
        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {showSuggestions && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 shadow-lg border-green-200">
          <CardContent className="p-0">
            {value.length === 0 ? (
              <div className="p-4 space-y-4">
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Recent Searches</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearRecentSearches}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        Clear
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(search)}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md text-sm text-gray-600"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Trending</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((trend, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-green-50 border-green-200 text-green-700"
                        onClick={() => handleSearch(trend)}
                      >
                        {trend}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-h-64 overflow-y-auto">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3">
                      <Search className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{suggestion.text}</span>
                    </div>
                    {suggestion.type === "trending" && (
                      <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">
                        Trending
                      </Badge>
                    )}
                    {suggestion.type === "category" && (
                      <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
                        Category
                      </Badge>
                    )}
                  </button>
                ))}
                {suggestions.length === 0 && (
                  <div className="px-4 py-3 text-sm text-gray-500">
                    No suggestions found
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedSearch;
