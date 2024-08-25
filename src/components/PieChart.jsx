import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { PieChart as EChartsPieChart } from 'echarts/charts';
import { TooltipComponent, TitleComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TooltipComponent, TitleComponent, EChartsPieChart, CanvasRenderer]);

const PieChart = ({ data, vegueria, comarca }) => {
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
        chartData = getActesPerMunicipi(); // Obtenemos los datos por municipio
        title = 'Actes per Municipi';
      } else if (vegueria) {
        chartData = getActesPerComarca(); // Obtenemos los datos por comarca
        title = 'Actes per Comarca';
      } else {
        chartData = getActesPerVegueria(); // Obtenemos los datos por veguería por defecto
        title = 'Actes per Vegueria';
      }

      const option = {
        backgroundColor: 'transparent',
        title: {
          text: title,
          left: 'center',
          top: '5%',
          textStyle: {
            fontFamily: 'Poppins',
            fontWeight: 'bold',
            fontSize: 18,
            color: '#fff'
          },
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: 'Actes',
            type: 'pie',
            radius: ['40%', '70%'],
            top: "10%",
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 10,
              padAngle: 5
            },
            label: {
              show: true,
              position: 'outside',
              formatter: '{b}: {c}', // Muestra el nombre y el valor
              fontSize: 12,
              fontFamily: 'Poppins',
              color: '#fff'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 14,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: true,
              length: 10,
              length2: 10
            },
            data: chartData
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

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default PieChart;
