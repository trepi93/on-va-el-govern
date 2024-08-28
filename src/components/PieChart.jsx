import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { TreemapChart } from 'echarts/charts';
import { TooltipComponent, TitleComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TooltipComponent, TitleComponent, TreemapChart, CanvasRenderer]);

const Treemap = ({ data, vegueria, comarca }) => {
  const chartRef = useRef(null);

  const getActesPerVegueria = () => {
    const actesPerVegueria = {};

    data.forEach(event => {
      const vegueriaEvent = event["Vegueria"];
      if (actesPerVegueria[vegueriaEvent]) {
        actesPerVegueria[vegueriaEvent]++;
      } else {
        actesPerVegueria[vegueriaEvent] = 1;
      }
    });

    return Object.keys(actesPerVegueria).map(vegueria => ({
      name: vegueria,
      value: actesPerVegueria[vegueria]
    }));
  };

  const getActesPerComarca = () => {
    const actesPerComarca = {};

    data.forEach(event => {
      const comarcaEvent = event["Comarca"];
      if (actesPerComarca[comarcaEvent]) {
        actesPerComarca[comarcaEvent]++;
      } else {
        actesPerComarca[comarcaEvent] = 1;
      }
    });

    return Object.keys(actesPerComarca).map(comarca => ({
      name: comarca,
      value: actesPerComarca[comarca]
    }));
  };

  const getActesPerMunicipi = () => {
    const actesPerMunicipi = {};

    data.forEach(event => {
      const municipi = event["Municipi"];
      if (actesPerMunicipi[municipi]) {
        actesPerMunicipi[municipi]++;
      } else {
        actesPerMunicipi[municipi] = 1;
      }
    });

    return Object.keys(actesPerMunicipi).map(municipi => ({
      name: municipi,
      value: actesPerMunicipi[municipi]
    }));
  };

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current, null);

      let chartData;
      let title;

      if (comarca) {
        chartData = getActesPerMunicipi(); 
        title = 'Municipi';
      } else if (vegueria) {
        chartData = getActesPerComarca(); 
        title = 'Comarca';
      } else {
        chartData = getActesPerVegueria(); 
        title = 'Vegueria';
      }

      const option = {
        backgroundColor: 'transparent',
        title: {
          text: title,
          left: 'left',
          top: '5%',
          textStyle: {
            fontFamily: 'Poppins',
            fontSize: 10,
            color: '#fff'
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}', 
        },
        series: [
          {
            name: 'Actes',
            type: 'treemap',
            data: chartData,
            label: {
              show: true,
              formatter: '{b}\n{c}', 
              fontSize: 12,
              fontFamily: 'Poppins',
              color: '#fff'
            },
            itemStyle: {
              borderColor: '#fff'
            }
          }
        ]
      };

      myChart.setOption(option);

      const resizeChart = () => {
        if (myChart) {
          myChart.resize();
        }
      };

      window.addEventListener('resize', resizeChart);

      return () => {
        window.removeEventListener('resize', resizeChart);
        myChart.dispose();
      };
    }
  }, [data, vegueria, comarca]);

  return (
    <div 
      ref={chartRef} 
      style={{ width: '100%', height: '100%' }} 
    />
  );
};

export default Treemap;
