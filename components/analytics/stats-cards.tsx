"use client"

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Users, 
  Award, 
  TrendingUp, 
  Bookmark
} from "lucide-react";

interface StatsProps {
  totalEmployees: number;
  avgRating: number;
  totalBookmarks: number;
  promotionRate: number;
}

export function StatsCards({ totalEmployees, avgRating, totalBookmarks, promotionRate }: StatsProps) {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalEmployees}</div>
          <p className="text-xs text-muted-foreground">
            {totalEmployees > 50 ? "+5% from last month" : "+2% from last month"}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
          <p className="text-xs text-muted-foreground">
            {avgRating > 3.5 ? "+0.3 from last quarter" : "+0.1 from last quarter"}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Bookmarked Employees</CardTitle>
          <Bookmark className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBookmarks}</div>
          <p className="text-xs text-muted-foreground">
            {totalBookmarks > 10 ? "+15% from last month" : "+5% from last month"}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Promotion Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{promotionRate}%</div>
          <p className="text-xs text-muted-foreground">
            {promotionRate > 12 ? "+2.5% from last year" : "+1.2% from last year"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}