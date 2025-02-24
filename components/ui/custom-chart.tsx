/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react"
import { Line } from "recharts"
import { LineChart as RechartsLineChart } from "recharts"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

interface LineChartProps {
    data: any[]
    index: string
    categories: string[]
    colors: string[]
    valueFormatter?: (value: number) => string
    className?: string
}

export const LineChart: React.FC<LineChartProps> = ({ data, index, categories, colors, valueFormatter, className }) => {
    return (
        <RechartsLineChart width={500} height={300} data={data} className={className}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={index} />
            <YAxis tickFormatter={valueFormatter} />
            <Tooltip formatter={(value: any) => (valueFormatter ? [valueFormatter(value)] : [value])} />
            <Legend />
            {categories.map((category, i) => (
                <Line
                    key={category}
                    type="monotone"
                    dataKey={category}
                    stroke={colors[i % colors.length]}
                    activeDot={{ r: 8 }}
                />
            ))}
        </RechartsLineChart>
    )
}

