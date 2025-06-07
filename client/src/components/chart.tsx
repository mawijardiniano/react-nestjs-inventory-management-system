import { useEffect, useState } from "react";
import axios from "axios";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "../components/ui/card";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig,
} from "../components/ui/chart";
import { TrendingUp } from "lucide-react";
import {ProductChart, MonthlyChartData} from "../lib/types"


interface Product {
  id: number;
  prod_name: string;
  prod_price: string;
  prod_quantity: number;
  prod_description: string;
  category_id: number;
  createdAt?: string;
  updatedAt?: string;
}


interface MonthlyChartData {
  key: string;
  label: string;
  value: number;
}

function getLast12Months(): MonthlyChartData[] {
  const now = new Date();
  const months: MonthlyChartData[] = [];

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    months.push({
      key,
      label: date.toLocaleString("default", { month: "short" }),
      value: 0,
    });
  }

  return months;
}

const chartConfig: ChartConfig = {
  totalValue: {
    label: "Total Value",
    color: "hsl(var(--chart-1))",
  },
};

export default function InventoryChart() {
  const [chartData, setChartData] = useState<{ month: string; totalValue: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<Product[]>("http://localhost:3000/product");
        const products = res.data;

        const months = getLast12Months();
        const monthMap = new Map(months.map((m) => [m.key, m]));

        for (const product of products) {
          const createdAt = product.createdAt
            ? new Date(product.createdAt)
            : null;

          if (!createdAt) continue;

          const key = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, "0")}`;
          const value = parseFloat(product.prod_price) * product.prod_quantity;

          if (monthMap.has(key)) {
            monthMap.get(key)!.value += value;
          }
        }

        setChartData(
          months.map((m) => ({
            month: m.label,
            totalValue: m.value,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Value (Last 12 Months)</CardTitle>
        <CardDescription>Based on product creation dates</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-totalValue)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-totalValue)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="totalValue"
              type="monotone"
              fill="url(#fillTotal)"
              stroke="var(--color-totalValue)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Inventory trending <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground">
              Last 12 months from {chartData[0]?.month ?? "-"} to {chartData.at(-1)?.month ?? "-"}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
