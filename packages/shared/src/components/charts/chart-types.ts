export interface ChartDataPoint {
  label: string;
  [key: string]: string | number | null;
}

export interface ChartSeries {
  key: string;
  label: string;
  color: string;
}

export interface PieSlice {
  name: string;
  value: number;
  color: string;
}

export interface SparklineData {
  value: number;
}
