import React, { useState } from 'react';
import { RadialBarChart, RadialBar, BarChart, PieChart, Pie, Bar, Legend, Tooltip, XAxis, YAxis } from 'recharts';

const Metrics = ({ metrics }) => {
  const width = 600;
  const height = 300;
  const { clientes, ingresos, productos, promedios } = metrics;
  const mapData = obj => {
    const arr = [];
    for (const key in obj) {
      arr.push({ Nombre: key, Cantidad: obj[key] });
    }
    return arr.slice(0, 5);
  };
  const productData = mapData(productos);
  const clientesData = mapData(clientes);
  console.log('clientesData :', clientesData);

  return (
    <div id='metrics'>
      <BarChart width={width} height={height} data={promedios}>
        <XAxis dataKey='estacion' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='Minutos' fill='#8884d8' />
      </BarChart>
      <PieChart width={width} height={height}>
        <Pie
          data={productData}
          dataKey='Cantidad'
          nameKey='Nombre'
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill='#8884d8'
        />
        <Tooltip />
        <Legend verticalAlign='bottom' layout='vertical' />
      </PieChart>
      <RadialBarChart width={width} height={height} data={clientesData} startAngle={180} endAngle={0}>
        <RadialBar
          background
          clockWise={true}
          dataKey='Cantidad'
          nameKey='Nombre'
          label={{ fill: '#666', position: 'insideStart', value: 'Nombre' }}
        />
        <Tooltip />
      </RadialBarChart>
    </div>
  );
};

export default Metrics;
