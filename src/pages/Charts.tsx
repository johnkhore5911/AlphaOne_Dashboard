import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
    ArcElement,
    PointElement,
    LineElement,
    Filler
  } from "chart.js";
  import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
  
  const months = ["January", "February", "March", "April", "May", "June", "July"];
  
  interface BarChartProps {
    horizontal?: boolean;
    data_1: number[];
    data_2: number[];
    title_1: string;
    title_2: string;
    bg_1: string;
    bg_2: string;
    labels?: string[];
  }
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler
  );
  
  export const BarChart = ({
    data_1 = [],
    data_2 = [],
    title_1,
    title_2,
    bg_1,
    bg_2,
    horizontal = false,
    labels = months,
  }: BarChartProps) => {
    const options: ChartOptions<"bar"> = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: horizontal ? "y" : "x",
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    };
  
    const data: ChartData<"bar", number[], string> = {
      labels,
      datasets: [
        {
          label: title_1,
          data: data_1,
          backgroundColor: bg_1,
          barThickness: "flex",
          barPercentage: 1,
          categoryPercentage: 0.4,
        },
        {
          label: title_2,
          data: data_2,
          backgroundColor: bg_2,
          barThickness: "flex",
          barPercentage: 1,
          categoryPercentage: 0.4,
        },
      ],
    };
  
    return <Bar options={options} data={data} />;
  };
  
  interface LineChartProps {
    data: number[];
    label: string;
    backgroundColor: string;
    borderColor: string;
    labels?: string[];
  }
  
  export const LineChart = ({
    data,
    label,
    backgroundColor,
    borderColor,
    labels = months,
  }: LineChartProps) => {
    const options: ChartOptions<"line"> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    };
  
    const lineChartData: ChartData<"line", number[], string> = {
      labels,
      datasets: [
        {
          fill: true,
          label,
          data,
          backgroundColor,
          borderColor,
        },
      ],
    };
  
    return <Line options={options} data={lineChartData} />;
  };
  
  interface DoughnutChartProps {
    labels: string[];
    data: number[];
    backgroundColor: string[];
    cutout?: number;
    offset?: number;
    legends?: boolean;
  }
  
  export const DoughnutChart = ({
    labels,
    backgroundColor,
    data,
    cutout,
    offset,
    legends = true,
  }: DoughnutChartProps) => {
    const doughnutData: ChartData<"doughnut", number[], string> = {
      labels,
      datasets: [
        {
          data,
          backgroundColor,
          borderWidth: 0,
          offset,
        },
      ],
    };
  
    const doughnutOptions: ChartOptions<"doughnut"> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: legends,
          position: "bottom",
          labels: {
            padding: 40,
          },
        },
      },
      cutout,
    };
  
    return <Doughnut data={doughnutData} options={doughnutOptions} />;
  };
  
  interface PieChartProps {
    labels: string[];
    data: number[];
    backgroundColor: string[];
    cutout?: number;
    offset?: number;
  }
  
  export const PieChart = ({
    labels,
    data,
    backgroundColor,
    offset,
    cutout,
  }: PieChartProps) => {
    const pieChartData: ChartData<"pie", number[], string> = {
      labels,
      datasets: [
        {
          data,
          backgroundColor,
          borderWidth: 1,
          offset,
        },
      ],
    };
  
    const pieChartOptions: ChartOptions<"pie"> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    };
  
    return <Pie data={pieChartData} options={pieChartOptions} />;
  };
  