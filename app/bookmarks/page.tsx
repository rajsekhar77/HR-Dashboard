"use client"

import { useBookmarks } from '@/context/bookmarks-context';
import { EmployeeCard } from '@/components/employee/employee-card';
import { BookmarkIcon } from 'lucide-react';

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Bookmarked Employees</h1>
        <p className="text-muted-foreground">
          Manage your saved employee profiles and quick actions.
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="flex h-[400px] w-full flex-col items-center justify-center rounded-lg border border-dashed">
          <BookmarkIcon className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No bookmarked employees</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Bookmark employees from the dashboard to add them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} variant="bookmark" />
          ))}
        </div>
      )}
    </div>
  );
}