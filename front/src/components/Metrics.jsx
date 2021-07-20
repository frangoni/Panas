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
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const Metrics = ({ metrics }) => {
  const color = 'rgb(81, 79, 76)';
  const { clientes, ingresos, productos, promedios } = metrics;
  const compare = key => {
    return function (a, b) {
      return a[key] < b[key] ? -1 : 1;
    };
  };

  const mapData = (obj, sortKey) => {
    const arr = [];
    for (const key in obj) {
      arr.push({ Nombre: key, Cantidad: obj[key] });
    }
    return arr.sort(compare(sortKey)).slice(-7);
  };

  const productData = mapData(productos, 'Cantidad');
  const clientesData = mapData(clientes, 'Cantidad');
  const ingresosData = mapData(ingresos, 'Nombre');

  return (
    <div id='metrics'>
      {/*BARRAS */}
      <div id='barchart'>
        <p>ESTACIONES</p>
        <BarChart width={700} height={250} data={promedios}>
          <XAxis dataKey='estacion' stroke={'white'} />
          <YAxis stroke={'white'} />
          <Tooltip />
          <Bar dataKey='Minutos' nameKey='estacion' fill={color} stroke={'white'} />
        </BarChart>
      </div>
      {/* PIE */}
      <div id='piechart'>
        <p>PRODUCTOS</p>
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
        <p>INGRESOS</p>
        <AreaChart width={700} height={250} data={ingresosData}>
          <XAxis dataKey='Nombre' stroke={'white'} />
          <YAxis stroke={'white'} />
          <Tooltip />
          <Area type='monotone' dataKey='Cantidad' fill={color} stroke={'black'} />
        </AreaChart>
      </div>
      {/* FUNNEL */}
      <div id='funnelchart'>
        <p>CLIENTES</p>
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
