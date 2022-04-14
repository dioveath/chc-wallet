import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Flex, Text, Button, Tabs, TabList, TabPanels, Tab, TabPanel }from '@chakra-ui/react';

import LineChart from '../../components/LineChart.js';
import Navbar from '../../components/Navbar.js';
import axios from 'axios';

import { generateRandomId } from '../../Service/TransactionService.js';
import config from '../../config/config.js';

import useAuth from '../../hooks/Auth.js';

export const options = {
  responsive: true,
  interaction: {
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Wallet of Charicha',
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
            font: {
              family: 'Nunito',
              size: 20
            },
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

  const { user } = useAuth();

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
          url: `${config.serverUrl}/api/v1/walletdata?year=${today.getFullYear()}&month=${today.getMonth()+1}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.accessToken
          }
        };


        let dataResponse = await axios.request(axiosDataOptions);
        let branchesResponse = await axios.get(`${config.serverUrl}/api/v1/branch`);

        let branches = branchesResponse.data.branches;
        let labels = Array.from({length: 10}, (_, i) => i+1);
        let newData = JSON.parse(JSON.stringify(financeData));
        let newOptions = JSON.parse(JSON.stringify(chartOptions));

        newOptions.id = branches.reduce((p, c) => `${p}${c.id}`, '');
        newData.id = `${today.getFullYear()}-${today.getMonth()}`;
        newData.labels = labels;
        newData.datasets = [];

        dataResponse.data.wallets.forEach((branchData) => {
          let branch = branches.find(branch => branch.branchId == branchData.branchId);
          if(branch === undefined) return;

          let datasetsData = branchData.data.filter((e, i) => i >= (branchData.data.length - 10));

          newData.datasets.push({
            label: branch.name,
            data: datasetsData,
            borderColor: branch.borderColor,
            backgroundColor: branch.backgroundColor,
            yAxisID: 'y',
            fill: 'start',
            tension: 0.4
          });
        });

        newOptions.plugins.annotation.annotations = [];
        branches.forEach((branch) => {
          let rentAnnotation = {
            type: 'line',
            borderColor: branch.borderColor,
            borderWidth: 2,
            click: function({chart, element}) {
              // console.log(chart, element);
            },
            label: {
              backgroundColor: branch.backgroundColor,
              content: 'Monthly Bill for ' + branch.name,
              position: 'start',
              enabled: true,
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
        <Text fontSize='2rem'
              fontWeight='bold'>
          Welcome to Charicha Dashboard Overview
        </Text>
        {user == null ?
         <Box backgroundColor="red.500" p="0.5rem 3rem" borderRadius="5px">
           <Text fontSize="1.5rem" color="white"> Please Login for all the financial details </Text>
         </Box> : <></>
        }
         <Box width="90%">
           <LineChart data={financeData} options={chartOptions}/>
         </Box>
      </Flex>
    </>
  );

}


export default HomePage;

