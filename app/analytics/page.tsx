"use client"

import { useState, useEffect } from 'react';
import { DepartmentChart } from '@/components/analytics/department-chart';
import { BookmarkTrends } from '@/components/analytics/bookmark-trends';
import { StatsCards } from '@/components/analytics/stats-cards';
import { generateDepartmentStats, generateBookmarkTrends } from '@/lib/utils';
import { useBookmarks } from '@/context/bookmarks-context';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { BookmarkTrend, DepartmentStat } from '@/lib/types';

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [departmentStats, setDepartmentStats] = useState<DepartmentStat[]>([]);
const [bookmarkTrends, setBookmarkTrends] = useState<BookmarkTrend[]>([]);

  const { bookmarks } = useBookmarks();

  useEffect(() => {
    // Simulate loading data from an API
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDepartmentStats(generateDepartmentStats());
      setBookmarkTrends(generateBookmarkTrends());
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  // Calculate some statistics for the top cards
  const totalEmployees = Math.floor(80 + Math.random() * 40); // Random number between 80-120
  const avgRating = 3.7 + Math.random() * 0.8; // Random between 3.7-4.5
  const totalBookmarks = bookmarks.length; 
  const promotionRate = Math.floor(10 + Math.random() * 8); // Random between 10-18%

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Employee performance insights and department statistics.
          </p>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {Array(4).fill(0).map((_, i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-4 w-24 mb-3" />
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </Card>
          ))}
        </div>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
          <Card className="lg:col-span-2 p-6">
            <Skeleton className="h-5 w-48 mb-4" />
            <Skeleton className="h-[300px] w-full" />
          </Card>
          <Card className="p-6">
            <Skeleton className="h-5 w-40 mb-4" />
            <Skeleton className="h-[300px] w-full" />
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Employee performance insights and department statistics.
        </p>
      </div>

      <StatsCards 
        totalEmployees={totalEmployees}
        avgRating={avgRating}
        totalBookmarks={totalBookmarks}
        promotionRate={promotionRate}
      />

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <DepartmentChart data={departmentStats} />
        <BookmarkTrends data={bookmarkTrends} />
      </div>
    </div>
  );
}