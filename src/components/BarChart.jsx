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

const BarChart = ({ filteredData }) => {
  const chartRef = useRef(null);

  // Función para obtener los actos por conseller y ordenarlos de más a menos
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

    // Convertimos a array y ordenamos de más a menos
    return Object.keys(actesPerConseller)
      .map(conseller => ({
        conseller,
        actes: actesPerConseller[conseller]
      }))
      .sort((a, b) => a.actes - b.actes); // Orden descendente
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

      const data = getActesPerConseller(); // Obtenemos los datos ordenados dentro del componente

      const option = {
        backgroundColor: 'transparent', 
        title: {
          text: 'Actes per càrrec',
          left: 'center', 
          textStyle: {
            fontFamily: 'Poppins', 
            fontWeight: 'bold',
            fontSize: 18
          },
          top: "3%"
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '10%',
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
  }, [filteredData]); // El efecto ahora depende de los datos filtrados

  return <div className="bar-chart" ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default BarChart;
