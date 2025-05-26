"use client"

import { useEmployees } from '@/hooks/use-employees';
import { EmployeeCard } from '@/components/employee/employee-card';
import { EmployeeFilter } from '@/components/employee/employee-filter';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const {
    employees,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    selectedDepartments,
    setSelectedDepartments,
    selectedRatings,
    setSelectedRatings,
  } = useEmployees();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Employee Dashboard</h1>
        <p className="text-muted-foreground">
          Manage and monitor employee performance and information.
        </p>
      </div>

      <EmployeeFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedDepartments={selectedDepartments}
        setSelectedDepartments={setSelectedDepartments}
        selectedRatings={selectedRatings}
        setSelectedRatings={setSelectedRatings}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, index) => (
            <div key={index} className="rounded-lg border shadow-sm">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-4/5" />
                </div>
              </div>
              <div className="p-4 pt-0">
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="flex h-[400px] w-full items-center justify-center rounded-lg border border-dashed">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Error loading employees</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      ) : employees.length === 0 ? (
        <div className="flex h-[400px] w-full items-center justify-center rounded-lg border border-dashed">
          <div className="text-center">
            <h3 className="text-lg font-semibold">No employees found</h3>
            <p className="text-sm text-muted-foreground">Try changing your search or filter criteria.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      )}
    </div>
  );
}