export const lugares = [
  {
    id: 1,
    nombre: 'Santiago',
    region: 'Región Metropolitana',
    descripcion: 'Capital de Chile, rodeada por la cordillera de los Andes.',
    temperatura: 18,
    sensacion: 17,
    humedad: 48,
    viento: 12,
    condicion: 'Parcialmente nublado',
    icono: '⛅',
    pronostico: [
      { dia: 'Lunes', minima: 8, maxima: 19, condicion: 'Soleado', icono: '☀️' },
      { dia: 'Martes', minima: 7, maxima: 18, condicion: 'Nublado', icono: '☁️' },
      { dia: 'Miércoles', minima: 9, maxima: 21, condicion: 'Soleado', icono: '☀️' },
      { dia: 'Jueves', minima: 10, maxima: 22, condicion: 'Despejado', icono: '🌤️' },
      { dia: 'Viernes', minima: 8, maxima: 17, condicion: 'Lluvia', icono: '🌧️' },
      { dia: 'Sábado', minima: 6, maxima: 16, condicion: 'Nublado', icono: '☁️' },
      { dia: 'Domingo', minima: 7, maxima: 20, condicion: 'Soleado', icono: '☀️' }
    ]
  },
  {
    id: 2,
    nombre: 'Valparaíso',
    region: 'Región de Valparaíso',
    descripcion: 'Ciudad costera conocida por sus cerros, ascensores y arte urbano.',
    temperatura: 16,
    sensacion: 15,
    humedad: 72,
    viento: 20,
    condicion: 'Nublado',
    icono: '☁️',
    pronostico: [
      { dia: 'Lunes', minima: 11, maxima: 17, condicion: 'Nublado', icono: '☁️' },
      { dia: 'Martes', minima: 12, maxima: 18, condicion: 'Despejado', icono: '🌤️' },
      { dia: 'Miércoles', minima: 12, maxima: 19, condicion: 'Soleado', icono: '☀️' },
      { dia: 'Jueves', minima: 10, maxima: 17, condicion: 'Lluvia', icono: '🌧️' },
      { dia: 'Viernes', minima: 11, maxima: 16, condicion: 'Nublado', icono: '☁️' },
      { dia: 'Sábado', minima: 12, maxima: 18, condicion: 'Despejado', icono: '🌤️' },
      { dia: 'Domingo', minima: 13, maxima: 20, condicion: 'Soleado', icono: '☀️' }
    ]
  },
  {
    id: 3,
    nombre: 'La Serena',
    region: 'Región de Coquimbo',
    descripcion: 'Ciudad costera reconocida por sus playas y cielos despejados.',
    temperatura: 19,
    sensacion: 19,
    humedad: 65,
    viento: 14,
    condicion: 'Despejado',
    icono: '🌤️',
    pronostico: [
      { dia: 'Lunes', minima: 12, maxima: 20, condicion: 'Despejado', icono: '🌤️' },
      { dia: 'Martes', minima: 13, maxima: 21, condicion: 'Soleado', icono: '☀️' },
      { dia: 'Miércoles', minima: 12, maxima: 20, condicion: 'Nublado', icono: '☁️' },
      { dia: 'Jueves', minima: 11, maxima: 19, condicion: 'Despejado', icono: '🌤️' },
      { dia: 'Viernes', minima: 13, maxima: 22, condicion: 'Soleado', icono: '☀️' },
      { dia: 'Sábado', minima: 14, maxima: 23, condicion: 'Soleado', icono: '☀️' },
      { dia: 'Domingo', minima: 12, maxima: 21, condicion: 'Despejado', icono: '🌤️' }
    ]
  },
  {
    id: 4,
    nombre: 'Concepción',
    region: 'Región del Biobío',
    descripcion: 'Importante ciudad del sur de Chile, cercana a ríos y zonas costeras.',
    temperatura: 14,
    sensacion: 12,
    humedad: 80,
    viento: 18,
    condicion: 'Lluvia ligera',
    icono: '🌧️',
    pronostico: [
      { dia: 'Lunes', minima: 7, maxima: 14, condicion: 'Lluvia', icono: '🌧️' },
      { dia: 'Martes', minima: 8, maxima: 15, condicion: 'Nublado', icono: '☁️' },
      { dia: 'Miércoles', minima: 6, maxima: 13, condicion: 'Lluvia', icono: '🌧️' },
      { dia: 'Jueves', minima: 7, maxima: 16, condicion: 'Despejado', icono: '🌤️' },
      { dia: 'Viernes', minima: 8, maxima: 17, condicion: 'Soleado', icono: '☀️' },
      { dia: 'Sábado', minima: 9, maxima: 15, condicion: 'Nublado', icono: '☁️' },
      { dia: 'Domingo', minima: 7, maxima: 14, condicion: 'Lluvia', icono: '🌧️' }
    ]
  },
  {
    id: 5,
    nombre: 'Puerto Montt',
    region: 'Región de Los Lagos',
    descripcion: 'Puerta de entrada a la Patagonia chilena y al archipiélago de Chiloé.',
    temperatura: 11,
    sensacion: 9,
    humedad: 87,
    viento: 25,
    condicion: 'Lluvia',
    icono: '🌧️',
    pronostico: [
      { dia: 'Lunes', minima: 5, maxima: 11, condicion: 'Lluvia', icono: '🌧️' },
      { dia: 'Martes', minima: 6, maxima: 12, condicion: 'Lluvia', icono: '🌧️' },
      { dia: 'Miércoles', minima: 4, maxima: 10, condicion: 'Nublado', icono: '☁️' },
      { dia: 'Jueves', minima: 5, maxima: 13, condicion: 'Despejado', icono: '🌤️' },
      { dia: 'Viernes', minima: 6, maxima: 12, condicion: 'Lluvia', icono: '🌧️' },
      { dia: 'Sábado', minima: 7, maxima: 14, condicion: 'Nublado', icono: '☁️' },
      { dia: 'Domingo', minima: 5, maxima: 11, condicion: 'Lluvia', icono: '🌧️' }
    ]
  },
  {
    id: 6,
    nombre: 'Punta Arenas',
    region: 'Región de Magallanes',
    descripcion: 'Ciudad austral ubicada frente al estrecho de Magallanes.',
    temperatura: 7,
    sensacion: 3,
    humedad: 71,
    viento: 38,
    condicion: 'Ventoso',
    icono: '💨',
    pronostico: [
      { dia: 'Lunes', minima: 1, maxima: 7, condicion: 'Ventoso', icono: '💨' },
      { dia: 'Martes', minima: 0, maxima: 6, condicion: 'Nublado', icono: '☁️' },
      { dia: 'Miércoles', minima: 2, maxima: 8, condicion: 'Lluvia', icono: '🌧️' },
      { dia: 'Jueves', minima: 1, maxima: 7, condicion: 'Ventoso', icono: '💨' },
      { dia: 'Viernes', minima: -1, maxima: 5, condicion: 'Nieve', icono: '🌨️' },
      { dia: 'Sábado', minima: 0, maxima: 6, condicion: 'Nublado', icono: '☁️' },
      { dia: 'Domingo', minima: 2, maxima: 9, condicion: 'Despejado', icono: '🌤️' }
    ]
  }
]