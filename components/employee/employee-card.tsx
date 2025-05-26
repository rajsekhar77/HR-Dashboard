"use client"

import Link from 'next/link';
import { Employee } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, BookmarkIcon, Award, BookmarkX, Mail, Phone
} from 'lucide-react';
import { StarRating } from '@/components/employee/star-rating';
import { useBookmarks } from '@/context/bookmarks-context';
import { cn, getRatingColor, formatCurrency } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface EmployeeCardProps {
  employee: Employee;
  variant?: 'default' | 'bookmark';
}

export function EmployeeCard({ employee, variant = 'default' }: EmployeeCardProps) {
  const { isBookmarked, toggleBookmark, removeBookmark } = useBookmarks();
  const { toast } = useToast();
  const bookmarked = isBookmarked(employee.id);
  
  const handlePromote = () => {
    toast({
      title: "Employee promoted",
      description: `${employee.firstName} ${employee.lastName} has been promoted.`,
    });
  };
  
  const handleAssign = () => {
    toast({
      title: "Assignment initiated",
      description: `${employee.firstName} ${employee.lastName} is being assigned to a new project.`,
    });
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border">
                <AvatarImage src={employee.image} alt={`${employee.firstName} ${employee.lastName}`} />
                <AvatarFallback>
                  {employee.firstName[0]}{employee.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-lg">
                  {employee.firstName} {employee.lastName}
                </h3>
                <div className="text-sm text-muted-foreground">
                  {employee.position}
                </div>
              </div>
            </div>
            <Badge variant="outline" className="ml-auto">
              {employee.department}
            </Badge>
          </div>
          
          <div className="grid gap-3">
            <div className="text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="truncate">{employee.email}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{employee.phone}</span>
            </div>
            
            <div className="flex justify-between items-center mt-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Performance:</span>
                <StarRating 
                  rating={employee.rating} 
                  className={cn("text-lg", getRatingColor(employee.rating))}
                />
              </div>
              <div className="text-sm font-medium">
                {formatCurrency(employee.salary)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between p-4 pt-0 gap-2">
        <Button asChild variant="outline" size="sm" className="flex-1">
          <Link href={`/employee/${employee.id}`}>
            <Eye className="mr-1 h-4 w-4" />
            View
          </Link>
        </Button>
        
        {variant === 'default' ? (
          <>
            <Button 
              variant={bookmarked ? "default" : "outline"} 
              size="sm" 
              className="flex-1"
              onClick={() => toggleBookmark(employee)}
            >
              {bookmarked ? (
                <>
                  <BookmarkX className="mr-1 h-4 w-4" />
                  Saved
                </>
              ) : (
                <>
                  <BookmarkIcon className="mr-1 h-4 w-4" />
                  Save
                </>
              )}
            </Button>
            
            <Button onClick={handlePromote} variant="outline" size="sm" className="flex-1">
              <Award className="mr-1 h-4 w-4" />
              Promote
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="destructive" 
              size="sm" 
              className="flex-1"
              onClick={() => removeBookmark(employee.id)}
            >
              <BookmarkX className="mr-1 h-4 w-4" />
              Remove
            </Button>
            
            <Button onClick={handleAssign} variant="outline" size="sm" className="flex-1">
              <Award className="mr-1 h-4 w-4" />
              Assign
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}