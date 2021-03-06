import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Flex, Text, Button, Tabs, TabList, TabPanels, Tab, TabPanel }from '@chakra-ui/react';

import LineChart from '../../components/LineChart.js';
import Navbar from '../../components/Navbar.js';
import Footer from '../../components/Footer.js';
import axios from 'axios';

import { generateRandomId } from '../../Service/TransactionService.js';
import config from '../../config/config.js';
import useAuth from '../../hooks/Auth.js';

import { useMediaQuery } from 'react-responsive';
import { getNumberOfDays } from '../../utils/DateUtils.js';

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Charicha Finance Overview',
      font: {
        size: '26px',
        color: 'white',
        weight: '600'
      }
    },
    autocolors: false,
    annotation: {
      drawTime: 'afterDraw',
      annotations: [
        {
          type: 'line',
          borderColor: 'white',
          borderWidth: 2,
          click: function({chart, element}) {
            // console.log(chart, element);
          },
          label: {
            backgroundColor: 'red',
            content: 'Please login to see full financial details',
            position: 'center',
            enabled: true,
          },
          scaleID: 'y',
          value: 0.5
        }
      ]
    }

  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
      weight: 10,
      gridLines: {
        drawBorder: false
      },
      ticks: {
        callback: (value, index, ticks) => {
          return "Rs. " + value;
        }
      }
    }
  },
};


export const data = {
  id: '0',
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  datasets: [
    {
      label: 'Charicha Institute',
      data: [],
      borderColor: '#0EE8E1',
      backgroundColor: '#0EE8E166',
      yAxisID: 'y',
      fill: 'start',
      tension: 0.4,
    },
    {
      label: 'Charicha Gaming',
      data: [],
      borderColor: '#B71B1B',
      backgroundColor: '#B71B1B66',
      yAxisID: 'y',
      fill: 'start',
      tension: 0.4,
    }
  ],
};


function HomePage (){
  const [financeData, setFinanceData] = useState(data);
  const [chartOptions, setChartOptions] = useState(options);

  const isTablet = useMediaQuery({ query: '(min-width: 768px)'});

  if(isTablet){
  }


  const { user, userData } = useAuth();

  useEffect(() => {
    (async () => {
      if(user === null) {
        setFinanceData(data);
        setChartOptions(options);
        return;
      }
      try {
        let today = new Date();

        const axiosDataOptions = {
          method: 'GET',
          url: `${config.serverUrl}/api/v1/walletdata?year=${today.getFullYear()}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.accessToken
          }
        };

        let dataResponse = await axios.request(axiosDataOptions);
        let branchesResponse = await axios.get(`${config.serverUrl}/api/v1/branch`);

        let prevMonth = new Date(new Date().setDate(0));
        let branches = branchesResponse.data.branches;
        let labels = Array.from({length: 10}, (_, i) => {
          let dayNum = today.getDate() - (9 - i);
          if(dayNum > 0){
            return dayNum + ' ' + today.toLocaleString('default', { month: 'short'});
          } else {
            return prevMonth.getDate() - (9 - i - today.getDate()) + ' ' + prevMonth.toLocaleString('default', { month: 'short'});
          }
        });
        let newData = JSON.parse(JSON.stringify(financeData));
        let newOptions = JSON.parse(JSON.stringify(chartOptions));

        newOptions.id = branches.reduce((p, c) => `${p}${c.id}`, '');
        newData.id = `${today.getFullYear()}-${today.getMonth()}`;
        newData.labels = labels;
        newData.datasets = [];

        dataResponse.data.wallets.forEach(async (branchData) => {
          let branch = branches.find(branch => branch.codeName == branchData.branchCode);
          if(branch === undefined) return;

          let datasetsData = branchData.data.filter((e, i) => 
            i >= (getNumberOfDays(today.getYear(), today.getMonth()) +  today.getDate() - 10)
              && i <= (getNumberOfDays(today.getYear(), today.getMonth()) +  today.getDate() - 1));

          newData.datasets.push({
            label: branch.name,
            data: datasetsData,
            borderColor: branch.borderColor,
            backgroundColor: branch.borderColor + Math.round(0.2 * 255).toString(16),
            yAxisID: 'y',
            fill: 'start',
            tension: 0.4
          });
        });

        newOptions.plugins.annotation.annotations = [];

        branches.forEach((branch) => {
          let rentAnnotation = {
            type: 'line',
            borderColor: branch.borderColor + Math.round(0.9 * 255).toString(16),
            backgroundColor: branch.backgroundColor,
            borderWidth: 2,
            click: function({chart, element}) {
              // console.log(chart, element);
            },
            label: {
              font: {
                size: '16px',
                weight: '500'
              },
              backgroundColor: branch.borderColor + Math.round(0.5 * 255).toString(16),
              color: 'white',
              content: branch.name + ' Bills',
              position: 'start',
              enabled: true,
              padding: 10
            },
            scaleID: 'y',
            value: parseInt(branch.roomRent) + parseInt(branch.internetBill) + parseInt(branch.waterBill)
          };

          newOptions.plugins.annotation.annotations.push(rentAnnotation);
        });

        setFinanceData(newData);
        setChartOptions(newOptions);
      } catch (e){
        console.log(e);
      }
    })();


  }, [financeData.id, chartOptions.id, user]);

  return (
    <>
      <Navbar/>
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        {/* <Text fontSize={['1.2rem', '1.4rem', '1.8rem']} */}
        {/*       fontWeight='bold'> */}
        {/*   Welcome to Charicha! */}
        {/* </Text> */}
        {
          user == null ?
            <Box backgroundColor="red.500" p="0.5rem 3rem" borderRadius="5px">
              <Text fontSize={["0.8rem", "1rem"]} color="white"> Please Login for all the financial details </Text>
            </Box> : <></>
        }
        <Box height="2rem"></Box>         
        <Box width={["99vw", "95vw", "90vw"]} height={["85vh"]}>
          <LineChart data={financeData} options={chartOptions}/>
        </Box>
      </Flex>
      <Box height="10rem"/>
      <Footer/>
    </>
  );

}


export default HomePage;

