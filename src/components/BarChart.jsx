import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import { BarChart as EChartsBarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  EChartsBarChart,
  CanvasRenderer
]);

const BarChart = ({ filteredData, selectedMinisterData }) => {
  const chartRef = useRef(null);

  const getActesPerConseller = () => {
    const actesPerConseller = {};

    filteredData.forEach(event => {
      const conseller = event["Càrrec"];
      if (actesPerConseller[conseller]) {
        actesPerConseller[conseller]++;
      } else {
        actesPerConseller[conseller] = 1;
      }
    });

    return Object.keys(actesPerConseller)
      .map(conseller => ({
        conseller,
        actes: actesPerConseller[conseller]
      }))
      .sort((a, b) => a.actes - b.actes); 
  };

  useEffect(() => {
    const resizeChart = () => {
      if (chartRef.current) {
        const myChart = echarts.getInstanceByDom(chartRef.current);
        if (myChart) {
          myChart.resize();
        }
      }
    };

    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current, 'dark');

      const data = getActesPerConseller(); 

      const option = {
        backgroundColor: 'transparent', 
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '3%',
          left: '3%',
          right: '6%',
          bottom: '5%',
          containLabel: true,
          backgroundColor: 'transparent' 
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          axisLabel: {
            fontFamily: 'Poppins', 
            fontSize: 12
          },
          splitLine: {
            show: false 
          }
        },
        yAxis: {
          type: 'category',
          data: data.map(item => item.conseller),
          axisLabel: {
            fontFamily: 'Poppins',
            fontSize: 12
          },
          splitLine: {
            show: false 
          }
        },
        series: [
          {
            name: 'Actes',
            type: 'bar',
            data: data.map(item => item.actes),
            label: {
              show: true,
              position: 'outside',
              textStyle: {
                fontFamily: 'Poppins',
                fontSize: 12
              }
            },
            itemStyle: {}
          },
        ]
      };
      myChart.setOption(option);
      chartRef.current.querySelector('canvas').style.borderRadius = '15px';
      window.addEventListener('resize', resizeChart);

      return () => {
        myChart.dispose();
        window.removeEventListener('resize', resizeChart);
      };
    }
  }, [filteredData]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {selectedMinisterData && (
        <div className="minister-info" style={{
          backgroundColor: '#222',
          padding: '10px',
          borderRadius: '10px',
          color: '#fff',
          marginBottom: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img src={selectedMinisterData.photo} alt={selectedMinisterData.name} style={{
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            marginRight: '10px'
          }} />
          <div>
            <h3 style={{ margin: 0 }}>{selectedMinisterData.name}</h3>
            <p style={{ margin: 0 }}>{selectedMinisterData.role}</p>
            <p style={{ margin: 0 }}>Actes: {selectedMinisterData.eventCount}</p>
          </div>
        </div>
      )}
      <div ref={chartRef} style={{ width: '100%', height: selectedMinisterData ? 'calc(100% - 80px)' : '100%' }} />
    </div>
  );
};

export default BarChart;
