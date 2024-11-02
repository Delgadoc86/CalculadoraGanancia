import React, { useState } from 'react';
import fondo from '../assets/fondo.jpg'; // Asegúrate de que la ruta sea correcta

function LandingPage() {
  const [precioTotal, setPrecioTotal] = useState('');
  const [ganancia, setGanancia] = useState('');
  const [cantidadKilos, setCantidadKilos] = useState(1);
  const [cantidadUnidades, setCantidadUnidades] = useState(1);
  const [modoCalculo, setModoCalculo] = useState('kilo');
  const [mostrarOpcionesAvanzadas, setMostrarOpcionesAvanzadas] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [resultadoUnitario, setResultadoUnitario] = useState(null);

  const calcularPrecio = () => {
    const total = parseFloat(precioTotal.replace(',', '.'));
    const porcentajeGanancia = parseFloat(ganancia.replace(',', '.'));
    const kilos = parseFloat(cantidadKilos.toString().replace(',', '.'));
    const unidades = parseFloat(cantidadUnidades.toString().replace(',', '.'));

    if (isNaN(total) || isNaN(porcentajeGanancia) || (modoCalculo === 'kilo' && (isNaN(kilos) || kilos <= 0)) || (modoCalculo === 'unidades' && (isNaN(unidades) || unidades <= 0)) || (modoCalculo === '100 gramos' && (isNaN(kilos) || kilos <= 0)))  {
      alert('Por favor, ingresa valores válidos.');
      return;
    }

    const precioConGanancia = total + (total * porcentajeGanancia) / 100;
    let precioFinal;

    if (modoCalculo === 'kilo') {
      precioFinal = precioConGanancia / kilos;
    } else if (modoCalculo === '100 gramos') {
      precioFinal = (precioConGanancia / kilos) / 10;
    } else if (modoCalculo === 'unidades') {
      precioFinal = precioConGanancia / unidades;
    }

    setResultado(precioFinal.toFixed(2));
    const precioUnitario = precioConGanancia / unidades;
    setResultadoUnitario(precioUnitario.toFixed(2));
  };

  const borrarCampos = () => {
    setPrecioTotal('');
    setCantidadKilos(1);
    setCantidadUnidades(1);
    setResultado(null);
    setResultadoUnitario(null);
    setMostrarOpcionesAvanzadas(false);
    setModoCalculo('kilo');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      <div className="absolute inset-0 bg-blue-500 opacity-50" />
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Calculadora de Porcentajes</h1>

        <div className="mb-4">
          <label className="block text-gray-700">Precio Total (Ej: 1600 por 10 paquetes)</label>
          <input
            type="number"
            value={precioTotal}
            onChange={(e) => setPrecioTotal(e.target.value)}
            placeholder="Ej: 1600"
            className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Porcentaje de Ganancia (%)</label>
          <input
            type="number"
            value={ganancia}
            onChange={(e) => setGanancia(e.target.value)}
            placeholder="Ej: 20"
            className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={mostrarOpcionesAvanzadas}
            onChange={() => setMostrarOpcionesAvanzadas(!mostrarOpcionesAvanzadas)}
            className="mr-2"
          />
          <label className="text-gray-700">Opciones avanzadas</label>
        </div>

        {mostrarOpcionesAvanzadas && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Seleccionar modo de cálculo:</label>
              <div className="flex justify-between">
                <button
                  onClick={() => setModoCalculo('kilo')}
                  className={`flex-1 bg-blue-500 text-white py-2 mx-1 rounded hover:bg-blue-600 focus:outline-none ${modoCalculo === 'kilo' ? 'bg-blue-700' : ''}`}
                >
                  Por Kilo
                </button>
                <button
                  onClick={() => setModoCalculo('100 gramos')}
                  className={`flex-1 bg-blue-500 text-white py-2 mx-1 rounded hover:bg-blue-600 focus:outline-none ${modoCalculo === '100 gramos' ? 'bg-blue-700' : ''}`}
                >
                  Por 100 Gramos
                </button>
                <button
                  onClick={() => setModoCalculo('unidades')}
                  className={`flex-1 bg-blue-500 text-white py-2 mx-1 rounded hover:bg-blue-600 focus:outline-none ${modoCalculo === 'unidades' ? 'bg-blue-700' : ''}`}
                >
                  Por Unidades
                </button>
              </div>
            </div>

            {modoCalculo !== 'unidades' && (
              <div className="mb-4">
                <label className="block text-gray-700">Cantidad de Kilos (Ej: 10)</label>
                <input
                  type="number"
                  value={cantidadKilos}
                  onChange={(e) => setCantidadKilos(e.target.value)}
                  placeholder="Ej: 10"
                  className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            )}

            {modoCalculo === 'unidades' && (
              <div className="mb-4">
                <label className="block text-gray-700">Cantidad de Unidades (Ej: 10)</label>
                <input
                  type="number"
                  value={cantidadUnidades}
                  onChange={(e) => setCantidadUnidades(e.target.value)}
                  placeholder="Ej: 10"
                  className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            )}
          </>
        )}

        <div className="flex justify-between mt-4">
          <button
            onClick={calcularPrecio}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
          >
            Calcular
          </button>
          <button
            onClick={borrarCampos}
            className="w-full bg-red-500 text-white py-2 px-4 rounded ml-2 hover:bg-red-600 focus:outline-none"
          >
            Borrar
          </button>
        </div>

        {resultado !== null && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
            <h2 className="text-xl text-center">Resultado: <span >${resultado} por {modoCalculo === '100 gramos' ? '100 gramos' : modoCalculo}</span></h2>
          </div>
        )}

        {resultadoUnitario !== null && (
          <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded">
             <h2 className="text-xl text-center">Precio Unitario con Ganancia: ${resultadoUnitario}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
