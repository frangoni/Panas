import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import {
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  BarChart,
  PieChart,
  Pie,
  Bar,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const Metrics = ({ metrics }) => {
  const width = 600;
  const height = 300;
  const { clientes, ingresos, productos, promedios } = metrics;
  const mapData = obj => {
    const arr = [];
    for (const key in obj) {
      arr.push({ Nombre: key, Cantidad: obj[key] });
    }
    return arr.slice(0, 8);
  };

  const productData = mapData(productos);
  const clientesData = mapData(clientes);
  const ingresosData = mapData(ingresos);
  console.log('ingresosData :', ingresosData);

  return (
    <Grid container id='metrics' spacing={5}>
      <Grid item xs={6}>
        <BarChart width={width} height={height} data={promedios}>
          <XAxis dataKey='estacion' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='Minutos' fill='#8884d8' />
        </BarChart>
      </Grid>

      <Grid item xs={4}>
        <PieChart width={width} height={height}>
          <Pie
            data={productData}
            dataKey='Cantidad'
            nameKey='Nombre'
            innerRadius={60}
            outerRadius={80}
            fill='#8884d8'
          />
          <Tooltip />
          <Legend verticalAlign='bottom' layout='vertical' />
        </PieChart>
      </Grid>
      <Grid item xs={4}>
        <RadialBarChart
          width={width}
          height={height}
          data={clientesData}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar
            background
            clockWise={true}
            dataKey='Cantidad'
            nameKey='Nombre'
            label={{ fill: '#666', position: 'insideStart', value: 'Nombre' }}
          />
          <Tooltip />
        </RadialBarChart>
      </Grid>
      <Grid item xs={6}>
        <AreaChart
          width={730}
          height={250}
          data={ingresosData.concat([
            { Nombre: '5-2021', Cantidad: 2000 },
            { Nombre: '4-2021', Cantidad: 1200 },
          ])}
        >
          <defs>
            <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey='Nombre' />
          <YAxis />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='Cantidad'
            stroke='#8884d8'
            fillOpacity={1}
            fill='url(#colorUv)'
          />
        </AreaChart>
      </Grid>
    </Grid>
  );
};

export default Metrics;
