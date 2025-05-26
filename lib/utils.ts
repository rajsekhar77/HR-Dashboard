import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Employee, Project, Feedback, PerformanceHistory, DepartmentStat, BookmarkTrend } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const departments = [
  'Engineering',
  'Marketing',
  'Sales',
  'Product',
  'Design',
  'HR',
  'Finance',
  'Operations',
  'Customer Support',
  'Legal',
];

export function getRatingColor(rating: number): string {
  if (rating >= 4.5) return 'text-green-500 dark:text-green-400';
  if (rating >= 3.5) return 'text-blue-500 dark:text-blue-400';
  if (rating >= 2.5) return 'text-yellow-500 dark:text-yellow-400';
  if (rating >= 1.5) return 'text-orange-500 dark:text-orange-400';
  return 'text-red-500 dark:text-red-400';
}

export function getRatingBadgeColor(rating: number): string {
  if (rating >= 4.5) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
  if (rating >= 3.5) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
  if (rating >= 2.5) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
  if (rating >= 1.5) return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100';
  return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
}

export function enrichEmployeeData(employees: any[]): Employee[] {
  return employees.map(employee => ({
    ...employee,
    department: getRandomDepartment(),
    rating: getRandomRating(),
    position: getRandomPosition(employee.gender),
    salary: getRandomSalary(),
    joinDate: getRandomJoinDate(),
  }));
}

function getRandomDepartment(): string {
  return departments[Math.floor(Math.random() * departments.length)];
}

function getRandomRating(): number {
  return Number((1 + Math.random() * 4).toFixed(1));
}

function getRandomPosition(gender: string): string {
  const positions = [
    'Junior Developer',
    'Senior Developer',
    'Team Lead',
    'Project Manager',
    'Product Manager',
    'UX Designer',
    'UI Designer',
    'Marketing Specialist',
    'Sales Representative',
    'HR Coordinator',
    'Financial Analyst',
    'Customer Support Specialist',
    'Operations Manager',
    'Legal Counsel',
  ];
  return positions[Math.floor(Math.random() * positions.length)];
}

function getRandomSalary(): number {
  return Math.floor(50000 + Math.random() * 100000);
}

function getRandomJoinDate(): string {
  const start = new Date(2015, 0, 1);
  const end = new Date();
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

export function 
generatePerformanceHistory(count: number = 5): PerformanceHistory[] {
  const history: PerformanceHistory[] = [];
  const reviewers = [
    'John Smith',
    'Emily Johnson',
    'Michael Williams',
    'Sarah Brown',
    'David Jones',
    'Jessica Miller',
    'Robert Davis',
    'Jennifer Garcia',
    'William Rodriguez',
    'Lisa Martinez',
  ];
  
  const summaries = [
    'Consistently meets expectations',
    'Exceeds expectations in most areas',
    'Shows great potential but needs guidance',
    'Strong performer with leadership qualities',
    'Needs improvement in communication',
    'Outstanding technical skills',
    'Great team player',
    'Innovative problem solver',
    'Excellent client management skills',
    'Requires more training in core competencies',
  ];
  
  const currentYear = new Date().getFullYear();
  
  for (let i = 0; i < count; i++) {
    const year = currentYear - i;
    const month = Math.floor(Math.random() * 12) + 1;
    const date = `${year}-${month.toString().padStart(2, '0')}-${Math.floor(Math.random() * 28) + 1}`;
    
    history.push({
      date,
      rating: Number((1 + Math.random() * 4).toFixed(1)),
      summary: summaries[Math.floor(Math.random() * summaries.length)],
      reviewer: reviewers[Math.floor(Math.random() * reviewers.length)],
    });
  }
  
  return history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function generateProjects(count: number = 5): Project[] {
  const projects: Project[] = [];
  const statuses: ('Not Started' | 'In Progress' | 'Completed')[] = ['Not Started', 'In Progress', 'Completed'];
  const priorities: ('Low' | 'Medium' | 'High')[] = ['Low', 'Medium', 'High'];
  
  const projectNames = [
    'Website Redesign',
    'Mobile App Development',
    'CRM Implementation',
    'Marketing Campaign',
    'Product Launch',
    'Data Migration',
    'Security Audit',
    'Performance Optimization',
    'Content Creation',
    'Customer Research',
    'Training Program',
    'Process Improvement',
    'Inventory Management',
    'Financial Reporting',
    'Compliance Review',
  ];
  
  const descriptions = [
    'Redesigning the company website to improve user experience and conversion rates.',
    'Developing a new mobile application for customers to access our services on-the-go.',
    'Implementing a customer relationship management system to better track and manage client interactions.',
    'Planning and executing a marketing campaign for our new product line.',
    'Coordinating the launch of our latest product, including marketing, sales, and customer support preparation.',
    'Migrating data from legacy systems to our new platform.',
    'Conducting a comprehensive security audit of our IT infrastructure.',
    'Optimizing application performance to improve response times and reduce server load.',
    'Creating engaging content for our blog, social media, and marketing materials.',
    'Researching customer needs and preferences to inform product development.',
    'Developing and delivering a training program for new employees.',
    'Identifying and implementing improvements to our internal processes.',
    'Upgrading our inventory management system to improve accuracy and efficiency.',
    'Preparing financial reports for the upcoming board meeting.',
    'Reviewing and ensuring compliance with industry regulations and standards.',
  ];
  
  for (let i = 0; i < count; i++) {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + Math.floor(Math.random() * 180));
    
    projects.push({
      id: i + 1,
      name: projectNames[Math.floor(Math.random() * projectNames.length)],
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      dueDate: futureDate.toISOString().split('T')[0],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
    });
  }
  
  return projects;
}

export function generateFeedback(count: number = 5): Feedback[] {
  const feedback: Feedback[] = [];
  const reviewers = [
    'John Smith',
    'Emily Johnson',
    'Michael Williams',
    'Sarah Brown',
    'David Jones',
    'Jessica Miller',
    'Robert Davis',
    'Jennifer Garcia',
    'William Rodriguez',
    'Lisa Martinez',
  ];
  
  const comments = [
    'Great team player who always helps others.',
    'Shows excellent attention to detail in all work.',
    'Communication skills need improvement.',
    'Consistently delivers projects ahead of schedule.',
    'Demonstrates strong leadership qualities.',
    'Technical skills are outstanding.',
    'Could improve time management.',
    'Creative problem solver who finds innovative solutions.',
    'Excellent client management skills.',
    'Needs to take more initiative on projects.',
    'Always willing to learn new skills and technologies.',
    'Positive attitude that motivates the team.',
    'Documentation could be more thorough.',
    'Adaptable and flexible when priorities change.',
    'Great mentor to junior team members.',
  ];
  
  const categories = [
    'Performance',
    'Communication',
    'Technical Skills',
    'Leadership',
    'Teamwork',
    'Time Management',
    'Problem Solving',
    'Client Relations',
    'Innovation',
    'Adaptability',
  ];
  
  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 365));
    
    feedback.push({
      id: i + 1,
      date: date.toISOString().split('T')[0],
      reviewer: reviewers[Math.floor(Math.random() * reviewers.length)],
      rating: Number((1 + Math.random() * 4).toFixed(1)),
      comment: comments[Math.floor(Math.random() * comments.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
    });
  }
  
  return feedback.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function generateDepartmentStats(): DepartmentStat[] {
  return departments.map(department => ({
    name: department,
    avgRating: Number((2 + Math.random() * 3).toFixed(1)),
    employeeCount: Math.floor(5 + Math.random() * 20),
    bookmarkCount: Math.floor(Math.random() * 15),
  }));
}

export function generateBookmarkTrends(): BookmarkTrend[] {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  return months.map(month => ({
    month,
    count: Math.floor(5 + Math.random() * 25),
  }));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
}