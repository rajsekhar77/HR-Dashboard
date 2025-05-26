"use client"

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  TooltipProps
} from 'recharts';
import { 
  NameType, 
  ValueType 
} from 'recharts/types/component/DefaultTooltipContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DepartmentStat } from '@/lib/types';
import { useTheme } from 'next-themes';

interface CustomTooltipProps extends TooltipProps<ValueType, NameType> {}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-md shadow-md p-3">
        <p className="font-medium">{label}</p>
        <p className="text-[hsl(var(--chart-1))]">
          Average Rating: {payload[0].value?.toString()}
        </p>
        <p className="text-[hsl(var(--chart-2))]">
          Employee Count: {payload[1].value?.toString()}
        </p>
      </div>
    );
  }

  return null;
};

interface DepartmentChartProps {
  data: DepartmentStat[];
}

export function DepartmentChart({ data }: DepartmentChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  const axisTextColor = isDark ? '#e0e0e0' : '#333333';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Department Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 110,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: axisTextColor }} 
                angle={-45}
                textAnchor="end"
                tickMargin={10}
              />
              <YAxis yAxisId="left" tick={{ fill: axisTextColor }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: axisTextColor }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 20 }} />
              <Bar 
                yAxisId="left"
                dataKey="avgRating" 
                name="Average Rating" 
                fill="hsl(var(--chart-1))" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                yAxisId="right"
                dataKey="employeeCount" 
                name="Employee Count" 
                fill="hsl(var(--chart-2))" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}