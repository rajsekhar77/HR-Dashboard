"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Filter, X } from 'lucide-react';
import { departments } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface EmployeeFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedDepartments: string[];
  setSelectedDepartments: (departments: string[]) => void;
  selectedRatings: number[];
  setSelectedRatings: (ratings: number[]) => void;
}

export function EmployeeFilter({
  searchTerm,
  setSearchTerm,
  selectedDepartments,
  setSelectedDepartments,
  selectedRatings,
  setSelectedRatings,
}: EmployeeFilterProps) {
  const [focused, setFocused] = useState(false);

  const handleDepartmentToggle = (department: string) => {
    setSelectedDepartments(
      selectedDepartments.includes(department)
        ? selectedDepartments.filter((d) => d !== department)
        : [...selectedDepartments, department]
    );
  };

  const handleRatingToggle = (rating: number) => {
    setSelectedRatings(
      selectedRatings.includes(rating)
        ? selectedRatings.filter((r) => r !== rating)
        : [...selectedRatings, rating]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDepartments([]);
    setSelectedRatings([]);
  };

  const hasActiveFilters = searchTerm || selectedDepartments.length > 0 || selectedRatings.length > 0;

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col md:flex-row gap-3">
        <div className={`relative flex-1 transition-all ${focused ? 'ring-2 ring-primary/20 rounded-md' : ''}`}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 w-full"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => setSearchTerm('')}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
              {(selectedDepartments.length > 0 || selectedRatings.length > 0) && (
                <Badge variant="secondary" className="ml-1">
                  {selectedDepartments.length + selectedRatings.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Departments</DropdownMenuLabel>
            {departments.map((department) => (
              <DropdownMenuCheckboxItem
                key={department}
                checked={selectedDepartments.includes(department)}
                onCheckedChange={() => handleDepartmentToggle(department)}
              >
                {department}
              </DropdownMenuCheckboxItem>
            ))}
            
            <DropdownMenuSeparator />
            
            <DropdownMenuLabel>Performance Rating</DropdownMenuLabel>
            {[1, 2, 3, 4, 5].map((rating) => (
              <DropdownMenuCheckboxItem
                key={rating}
                checked={selectedRatings.includes(rating)}
                onCheckedChange={() => handleRatingToggle(rating)}
              >
                {rating} {rating === 1 ? 'Star' : 'Stars'}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        {hasActiveFilters && (
          <Button variant="ghost" onClick={clearFilters} className="flex gap-2">
            <X className="h-4 w-4" />
            <span>Clear</span>
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedDepartments.map((dept) => (
            <Badge key={dept} variant="secondary" className="flex items-center gap-1">
              {dept}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleDepartmentToggle(dept)}
              />
            </Badge>
          ))}
          
          {selectedRatings.map((rating) => (
            <Badge key={rating} variant="secondary" className="flex items-center gap-1">
              {rating} {rating === 1 ? 'Star' : 'Stars'}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleRatingToggle(rating)}
              />
            </Badge>
          ))}
          
          {searchTerm && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {'"'}{searchTerm}{'"'}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setSearchTerm('')}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}