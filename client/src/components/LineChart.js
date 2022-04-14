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
  size: 16,
  family: 'Nunito'
};

function LineChart(props) {
  return (
    <Line data={props.data} options={props.options}/>
  );
}

export default LineChart;
