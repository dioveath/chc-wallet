import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import AnnotationPlugin from 'chartjs-plugin-annotation';
import { Line } from 'react-chartjs-2';
import { useMediaQuery } from 'react-responsive';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  AnnotationPlugin
);

ChartJS.defaults.font = {
  size: 13,
  family: 'Nunito'
};

function LineChart(props) {
  const isTablet = useMediaQuery({ query: '(min-width: 768px)'});
  if(isTablet)
    ChartJS.defaults.font = {
      size: 16,
      family: 'Nunito'    
    };
  else
    ChartJS.defaults.font = {
      size: 13,
      family: 'Nunito'
    };

  return (
    <Line data={props.data} options={props.options}/>
  );
}

export default LineChart;
