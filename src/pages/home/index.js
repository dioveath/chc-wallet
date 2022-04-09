import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Flex, Text, Button, Tabs, TabList, TabPanels, Tab, TabPanel }from '@chakra-ui/react';

import LineChart from '../../components/LineChart.js';

export const options = {
  responsive: true,
  interaction: {
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Charicha Finance',
    },
  },
  
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    }
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Charicha Institute',
      data: labels.map(() => Math.random() * 1000),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      yAxisID: 'y',
      fill: 'start',
      tension: 0.4,
    },
    {
      label: 'Charicha Institute',
      data: labels.map(() => Math.random() * 1000),
      borderColor: 'rgb(39, 201, 83)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      yAxisID: 'y',
      fill: 'start',
      tension: 0.4,
    },
    {
      label: 'Charicha Institute',
      data: labels.map(() => Math.random() * 1000),
      borderColor: 'rgb(90, 10, 78)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      yAxisID: 'y',
      fill: 'start',
      tension: 0.4,
    }    
  ],
};

function HomePage (){
  const [financeData, setFinanceData] = useState(data);

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Text fontSize='2rem'
            fontWeight='bold'>
        Welcome to Charicha Dashboard Overview
      </Text>

      <Tabs width="100%">
        <TabList>
          <Tab width="100%"> Income </Tab>
          <Tab width="100%"> Expense </Tab>
        </TabList>

        <TabPanels>
          <TabPanel display="flex" flexDirection="column" justifyContent="center" alignItems="center">

            <Box width="100%">
              <LineChart data={financeData} options={options}/>
            </Box>
            <Button onClick={() => {
              let newData = JSON.parse(JSON.stringify(financeData));
              newData.datasets.forEach((dtSet) => {
                dtSet.data = labels.map(() => Math.random() * 1000);
                if(dtSet.fill === "start") {
                  dtSet.fill = "end";
                } else {
                  dtSet.fill = "start";
                }
              });
              setFinanceData(newData);
            }}> Change to Fill </Button>
            
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>      

    </Flex>
  );

}


export default HomePage;

