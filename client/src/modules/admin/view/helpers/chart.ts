import type { ChartData, ChartOptions } from 'chart.js';

const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue('--text-color');
const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

export function getChartData(): ChartData {
  return {
    labels: [],
    datasets: [
      {
        label: 'Income',
        fill: false,
        borderColor: documentStyle.getPropertyValue('--blue-500'),
        yAxisID: 'y',
        tension: 0.4,
        data: []
      },
      {
        label: 'Orders',
        fill: false,
        borderColor: documentStyle.getPropertyValue('--green-500'),
        yAxisID: 'y1',
        tension: 0.4,
        data: []
      }
    ]
  };
}

export function getChartOptions(): ChartOptions {
  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
          usePointStyle: true,
          padding: 16,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          drawOnChartArea: false,
          color: surfaceBorder,
        },
      },
    },
  };
}
