"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Employee, PerformanceHistory, Project, Feedback } from '@/lib/types';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  BookmarkIcon, 
  BookmarkX, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase,
  Clock,
  ArrowLeft, 
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { 
  enrichEmployeeData, 
  generatePerformanceHistory, 
  generateProjects, 
  generateFeedback,
  getRatingBadgeColor,
  formatCurrency,
  formatDate
} from '@/lib/utils';
import { StarRating } from '@/components/employee/star-rating';
import { useBookmarks } from '@/context/bookmarks-context';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function EmployeeDetailsPage() {
  const params = useParams();
  const employeeId = Number(params.id);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [performanceHistory, setPerformanceHistory] = useState<PerformanceHistory[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchEmployeeDetails() {
      try {
        setIsLoading(true);
        // Fetch the employee details
        const response = await fetch(`https://dummyjson.com/users/${employeeId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch employee details');
        }
        
        const data = await response.json();
        // Enrich the data with additional fields
        const [enrichedEmployee] = enrichEmployeeData([data]);
        
        setEmployee(enrichedEmployee);
        
        // Generate mock data for the employee
        setPerformanceHistory(generatePerformanceHistory());
        setProjects(generateProjects());
        setFeedback(generateFeedback());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    if (employeeId) {
      fetchEmployeeDetails();
    }
  }, [employeeId]);

  const handlePromote = () => {
    if (!employee) return;
    
    toast({
      title: "Employee promoted",
      description: `${employee.firstName} ${employee.lastName} has been promoted.`,
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <Skeleton className="h-8 w-64" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <Skeleton className="h-5 w-32 mb-2" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div className="space-y-2 text-center">
                  <Skeleton className="h-6 w-40 mx-auto" />
                  <Skeleton className="h-4 w-32 mx-auto" />
                </div>
              </div>
              <div className="space-y-4">
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <Skeleton className="h-5 w-40 mb-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[400px] w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center rounded-lg border border-dashed">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Error loading employee details</h3>
          <p className="text-sm text-muted-foreground">
            {error || 'Employee not found'}
          </p>
          <Button asChild className="mt-4">
            <Link href="/">Go back to dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  const isEmployeeBookmarked = isBookmarked(employee.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            {employee.firstName} {employee.lastName}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={isEmployeeBookmarked ? "default" : "outline"}
            className="gap-2"
            onClick={() => toggleBookmark(employee)}
          >
            {isEmployeeBookmarked ? (
              <>
                <BookmarkX className="h-4 w-4" />
                <span>Remove Bookmark</span>
              </>
            ) : (
              <>
                <BookmarkIcon className="h-4 w-4" />
                <span>Bookmark</span>
              </>
            )}
          </Button>
          
          <Button className="gap-2" onClick={handlePromote}>
            <Award className="h-4 w-4" />
            <span>Promote</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24 border-2 border-border">
                <AvatarImage src={employee.image} alt={`${employee.firstName} ${employee.lastName}`} />
                <AvatarFallback className="text-lg">
                  {employee.firstName[0]}{employee.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-semibold">
                  {employee.firstName} {employee.lastName}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {employee.position}
                </p>
                <Badge className={getRatingBadgeColor(employee.rating)}>
                  <StarRating rating={employee.rating} className="mr-1" />
                  {employee.rating.toFixed(1)}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">{employee.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">{employee.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">
                  {employee.address.address}, {employee.address.city}, {employee.address.state}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">{employee.department}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Joined: {formatDate(employee.joinDate)}</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Salary: {formatCurrency(employee.salary)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Employee Details</CardTitle>
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="feedback">Feedback</TabsTrigger>
                </TabsList>
              </div>
              <CardDescription>
                View detailed information, projects, and performance reviews.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Performance History</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Reviewer</TableHead>
                        <TableHead className="hidden md:table-cell">Summary</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {performanceHistory.map((review, index) => (
                        <TableRow key={index}>
                          <TableCell>{formatDate(review.date)}</TableCell>
                          <TableCell>
                            <Badge className={getRatingBadgeColor(review.rating)}>
                              {review.rating.toFixed(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{review.reviewer}</TableCell>
                          <TableCell className="hidden md:table-cell">{review.summary}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Employee Summary</h3>
                  <p className="text-sm text-muted-foreground">
                    {employee.firstName} {employee.lastName} is a {employee.position} in the {employee.department} department.
                    They have been with the company since {formatDate(employee.joinDate)} and have consistently 
                    {employee.rating >= 4 ? ' exceeded expectations in their role.' : 
                     employee.rating >= 3 ? ' met expectations in their role.' : 
                     ' shown potential for growth in their role.'} 
                    Their current performance rating is {employee.rating.toFixed(1)} out of 5.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="projects" className="space-y-4">
                <div className="grid gap-4">
                  {projects.map((project) => (
                    <Card key={project.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{project.name}</CardTitle>
                          {project.status === 'In Progress' && (
                            <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                              In Progress
                            </Badge>
                          )}
                          {project.status === 'Completed' && (
                            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                              Completed
                            </Badge>
                          )}
                          {project.status === 'Not Started' && (
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                              Not Started
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <p className="text-sm text-muted-foreground mb-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Due: {formatDate(project.dueDate)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {project.priority === 'High' && (
                              <AlertCircle className="h-4 w-4 text-red-500" />
                            )}
                            {project.priority === 'Medium' && (
                              <AlertCircle className="h-4 w-4 text-yellow-500" />
                            )}
                            {project.priority === 'Low' && (
                              <AlertCircle className="h-4 w-4 text-green-500" />
                            )}
                            <span>Priority: {project.priority}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="feedback" className="space-y-4">
                <div className="grid gap-4">
                  {feedback.map((item) => (
                    <Card key={item.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <CardTitle className="text-base">{item.category} Feedback</CardTitle>
                          </div>
                          <Badge variant="outline">
                            {formatDate(item.date)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <StarRating rating={item.rating} />
                          <span className="text-sm font-medium">
                            Rating: {item.rating.toFixed(1)}/5
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          "{item.comment}"
                        </p>
                        <div className="text-sm text-muted-foreground">
                          Reviewed by: {item.reviewer}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}