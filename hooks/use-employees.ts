"use client"

import { useState, useEffect } from 'react';
import { Employee } from '@/lib/types';
import { enrichEmployeeData } from '@/lib/utils';

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        setIsLoading(true);
        const response = await fetch('https://dummyjson.com/users?limit=20');
        
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        
        const data = await response.json();
        const enrichedData = enrichEmployeeData(data.users);
        
        setEmployees(enrichedData);
        setFilteredEmployees(enrichedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    fetchEmployees();
  }, []);

  useEffect(() => {
    let result = [...employees];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        employee => 
          employee.firstName.toLowerCase().includes(term) || 
          employee.lastName.toLowerCase().includes(term) || 
          employee.email.toLowerCase().includes(term) || 
          employee.department.toLowerCase().includes(term)
      );
    }
    
    // Filter by departments
    if (selectedDepartments.length > 0) {
      result = result.filter(employee => 
        selectedDepartments.includes(employee.department)
      );
    }
    
    // Filter by ratings
    if (selectedRatings.length > 0) {
      result = result.filter(employee => {
        // Round rating to nearest integer for filtering
        const roundedRating = Math.round(employee.rating);
        return selectedRatings.includes(roundedRating);
      });
    }
    
    setFilteredEmployees(result);
  }, [employees, searchTerm, selectedDepartments, selectedRatings]);

  return {
    employees: filteredEmployees,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    selectedDepartments,
    setSelectedDepartments,
    selectedRatings,
    setSelectedRatings,
  };
}