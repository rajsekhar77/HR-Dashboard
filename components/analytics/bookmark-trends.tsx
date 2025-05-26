"use client"

import { 
  LineChart, 
  Line, 
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
import { BookmarkTrend } from '@/lib/types';
import { useTheme } from 'next-themes';

interface CustomTooltipProps extends TooltipProps<ValueType, NameType> {}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-md shadow-md p-3">
        <p className="font-medium">{label}</p>
        <p className="text-[hsl(var(--chart-3))]">
          Bookmark Count: {payload[0].value?.toString()}
        </p>
      </div>
    );
  }

  return null;
};

interface BookmarkTrendsProps {
  data: BookmarkTrend[];
}

export function BookmarkTrends({ data }: BookmarkTrendsProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  const axisTextColor = isDark ? '#e0e0e0' : '#333333';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Bookmark Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="month" tick={{ fill: axisTextColor }} />
              <YAxis tick={{ fill: axisTextColor }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                name="Bookmarks"
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}