import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import api from '../utils/api';

interface PowerData {
  timestamp: string;
  dk1: number;
  dk2: number;
  dkGas: number;
}

const PowerChart: React.FC = () => {
  const [powerData, setPowerData] = useState<PowerData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPowerData = async () => {
      try {
        const response = await api.get('/alerts/power-data');
        setPowerData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load power data');
        setLoading(false);
      }
    };

    fetchPowerData();
  }, []);

  // Prepare chart data
  const prepareChartData = () => {
    if (powerData.length === 0) {
      return {
        timestamps: [],
        dk1: [],
        dk2: [],
        dkGas: []
      };
    }

    const timestamps = powerData.map(data => {
      const date = new Date(data.timestamp);
      return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} AM`;
    });

    const dk1 = powerData.map(data => data.dk1);
    const dk2 = powerData.map(data => data.dk2);
    const dkGas = powerData.map(data => data.dkGas);

    return { timestamps, dk1, dk2, dkGas };
  };

  const { timestamps, dk1, dk2, dkGas } = prepareChartData();

  const chartOptions: ApexOptions = {
    chart: {
      type: 'area',
      height: 280,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100]
      }
    },
    colors: ['#38BDF8', '#2DD4BF', '#4ADE80'],
    xaxis: {
      categories: timestamps,
      labels: {
        style: {
          colors: '#94a3b8',
          fontSize: '10px'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      min: 38,
      max: 62,
      labels: {
        style: {
          colors: '#94a3b8',
          fontSize: '10px'
        },
        formatter: (value) => `${value.toFixed(2)}`
      }
    },
    grid: {
      borderColor: '#F1F5F9',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    tooltip: {
      x: {
        format: 'HH:mm'
      }
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '12px',
      markers: {
        radius: 12
      }
    }
  };

  const series = [
    {
      name: 'DK - 1',
      data: dk1
    },
    {
      name: 'DK - 2',
      data: dk2
    },
    {
      name: 'DK - Gas',
      data: dkGas
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="h-[280px]">
      <ReactApexChart 
        options={chartOptions} 
        series={series} 
        type="area" 
        height="100%" 
      />
    </div>
  );
};

export default PowerChart;