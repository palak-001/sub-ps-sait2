import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getTodayDateString } from '../utils/storage';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function TrendChart({ history, targets, calculateScore }) {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });

  const scores = last7Days.map(date => {
    const data = history[date];
    return data ? calculateScore(data, targets) : 0;
  });

  const labels = last7Days.map(date => {
    const d = new Date(date);
    return date === getTodayDateString() ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' });
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Wellness Score',
        data: scores,
        borderColor: '#000000',
        backgroundColor: '#FDE047',
        borderWidth: 4,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#000000',
        pointBorderWidth: 4,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          font: {
            family: "'Space Grotesk', sans-serif",
            weight: 'bold',
            size: 14
          },
          color: '#000'
        },
        grid: {
          color: '#000',
          lineWidth: 2,
        },
        border: {
          color: '#000',
          width: 4
        }
      },
      x: {
        ticks: {
          font: {
            family: "'Space Grotesk', sans-serif",
            weight: 'bold',
            size: 14
          },
          color: '#000'
        },
        grid: {
          display: false
        },
        border: {
          color: '#000',
          width: 4
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: '#000',
        borderWidth: 4,
        titleFont: {
          family: "'Space Grotesk', sans-serif",
          weight: 'bold',
          size: 16
        },
        bodyFont: {
          family: "'Space Grotesk', sans-serif",
          weight: 'bold',
          size: 16
        },
        padding: 12,
        cornerRadius: 0,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.y}%`
        }
      }
    }
  };

  return (
    <div className="h-48 w-full p-2 bg-neoYellow border-4 border-black rounded-xl shadow-neo-sm relative">
      <Line data={data} options={options} />
    </div>
  );
}
