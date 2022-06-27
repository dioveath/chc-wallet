import { Pie } from 'react-chartjs-2';
import useTransactions from '../../hooks/Transaction.js';
import useAuth from '../../hooks/Auth.js';
import { useState, useEffect } from 'react';
import { seededRandom } from '../../utils/RandomUtils.js';
import { useMediaQuery } from 'react-responsive';

const defaultData = {
  id: '0',
  labels: ["N/A"],
  datasets: [
    {
      label: 'Charicha Institute',
      data: [100],
      borderColor: '#0EE8E1',
      backgroundColor: '#0EE8E166',
    }
  ],
};

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: true,
  legend: {
    legendCallback: function(chart){
      console.log(chart);
      return [
        <ul>
          <li> fsad </li>
          <li> sdfa </li>
        </ul>
      ];
    }
  }
};


const COLORS = [
  '#3a86ffee',
  '#e9c46aee',
  '#8338ecee',
  '#ffbe0bee',
  '#f4a261ee',
  '#fb5607ee',
  '#264653ee',
  '#0354eeee',
  '#2a9d8fee',
  '#e76f51ee'
];



function FinancePieChart({ transactions }){
  const [pieData, setPieData] = useState(defaultData);
  const [pieOptions, setPieOptions] = useState(defaultOptions);
  const { userData } = useAuth();
  const isTablet = useMediaQuery({ query: '(min-width: 768px)'});

  useEffect(() => {

    let categories = [];
    transactions.forEach((t) => {
      let prevValue = categories[t.category] || 0;
      categories[t.category] = prevValue + t.amount;
    });

    const isReverse = Math.random() > 0.45 ? true : false;
    let colors = Object.keys(categories).map((c, i) => {
      const index = isReverse ? (COLORS.length - 1 - i) : i % COLORS.length;
      return COLORS[index];
    });
    
    setPieData({...pieData, labels: Object.keys(categories), datasets: [
      {
        label: 'Label',
        data: Object.values(categories),
        datalabels: {
          labels: {
            title: {
              font: {
                weight: 'normal',
                size: isTablet ? '16px' : '12px'
              },
              color: 'white',
            }
          }
        },
        backgroundColor: colors,
        borderColor: userData?.branch?.borderColor + Math.round(0.4 * 255).toString(16),
      }
    ]});

    setPieOptions({...pieOptions, plugins: {
      datalabels: {
        formatter: function(value, context){
          return context.chart.data.labels[context.dataIndex] + ': Rs.' + value;
        }
      }
    }});
    
  }, [transactions.length, isTablet]);

  return <Pie data={pieData} options={pieOptions}/>;
}


export default FinancePieChart; 
