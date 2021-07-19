import React from 'react';
import {
  AreaChart,
  Area,
  FunnelChart,
  Funnel,
  BarChart,
  PieChart,
  Pie,
  Bar,
  LabelList,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const Metrics = ({ metrics }) => {
  const color = 'rgb(81, 79, 76)';
  const { clientes, ingresos, productos, promedios } = metrics;
  console.log('promedios :', promedios);
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
  return (
    <div id='metrics'>
      {/*BARRAS */}
      <div id='barchart'>
        <p className='title'>ESTACIONES</p>
        <BarChart width={700} height={250} data={promedios}>
          <XAxis dataKey='estacion' stroke={'white'} />
          <YAxis stroke={'white'} />
          <Tooltip />
          <Bar dataKey='Minutos' nameKey='estacion' fill={color} stroke={'white'} />
        </BarChart>
      </div>
      {/* PIE */}
      <div id='piechart'>
        <p className='title'>PRODUCTOS</p>
        <PieChart width={450} height={300}>
          <Pie
            data={productData}
            dataKey='Cantidad'
            nameKey='Nombre'
            innerRadius={60}
            outerRadius={90}
            fill={color}
            stroke={'white'}
          />
          <Tooltip />
        </PieChart>
      </div>
      {/* AREA */}
      <div id='areachart'>
        <p className='title'>INGRESOS</p>
        <AreaChart width={700} height={250} data={ingresosData}>
          <XAxis dataKey='Nombre' stroke={'white'} />
          <YAxis stroke={'white'} dataKey='Cantidad' />
          <Tooltip />
          <Area type='monotone' dataKey='Cantidad' nameKey='Nombre' fill={color} stroke={'white'} />
        </AreaChart>
      </div>
      {/* FUNNEL */}
      <div id='funnelchart'>
        <p className='title'>CLIENTES</p>
        <FunnelChart width={450} height={300}>
          <Funnel
            fill={color}
            dataKey='Cantidad'
            nameKey='Nombre'
            data={clientesData}
            stroke={'white'}
          >
            <LabelList fill='white' dataKey='Nombre' />
          </Funnel>
          <Tooltip />
        </FunnelChart>
      </div>
    </div>
  );
};

export default Metrics;
