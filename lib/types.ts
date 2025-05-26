export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  age: number;
  department: string;
  rating: number;
  position: string;
  salary: number;
  joinDate: string;
  phone: string;
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

export interface Project {
  id: number;
  name: string;
  description: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
}

export interface Feedback {
  id: number;
  date: string;
  reviewer: string;
  rating: number;
  comment: string;
  category: string;
}

export interface PerformanceHistory {
  date: string;
  rating: number;
  summary: string;
  reviewer: string;
}

export interface DepartmentStat {
  name: string;
  avgRating: number;
  employeeCount: number;
  bookmarkCount: number;
}

export interface BookmarkTrend {
  month: string;
  count: number;
}