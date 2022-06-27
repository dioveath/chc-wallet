import { Line } from 'react-chartjs-2';

function LineChart(props) {

  return (
    <Line data={props.data} options={props.options}/>
  );
}

export default LineChart;
