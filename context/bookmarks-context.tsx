"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Employee } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface BookmarksContextType {
  bookmarks: Employee[];
  isBookmarked: (id: number) => boolean;
  toggleBookmark: (employee: Employee) => void;
  removeBookmark: (id: number) => void;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Employee[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedBookmarks = localStorage.getItem('hr-bookmarks');
    if (storedBookmarks) {
      try {
        setBookmarks(JSON.parse(storedBookmarks));
      } catch (error) {
        console.error('Failed to parse stored bookmarks:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (bookmarks.length > 0) {
      localStorage.setItem('hr-bookmarks', JSON.stringify(bookmarks));
    }
  }, [bookmarks]);

  const isBookmarked = (id: number) => {
    return bookmarks.some((bookmark) => bookmark.id === id);
  };

  const toggleBookmark = (employee: Employee) => {
    if (isBookmarked(employee.id)) {
      removeBookmark(employee.id);
    } else {
      setBookmarks((prev) => [...prev, employee]);
      toast({
        title: "Employee bookmarked",
        description: `${employee.firstName} ${employee.lastName} has been added to your bookmarks.`,
      });
    }
  };

  const removeBookmark = (id: number) => {
    setBookmarks((prev) => {
      const employee = prev.find((e) => e.id === id);
      const newBookmarks = prev.filter((bookmark) => bookmark.id !== id);
      
      if (employee) {
        toast({
          title: "Bookmark removed",
          description: `${employee.firstName} ${employee.lastName} has been removed from your bookmarks.`,
        });
      }
      
      return newBookmarks;
    });
  };

  return (
    <BookmarksContext.Provider value={{ bookmarks, isBookmarked, toggleBookmark, removeBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
}