# App de Clima Vue

Aplicación de clima desarrollada como una SPA utilizando Vue 3 y Vue Router.

La aplicación permite consultar el clima actual de diferentes ciudades de Chile, buscar lugares, cambiar la unidad de temperatura y revisar el pronóstico semanal junto con sus estadísticas.

## Funcionalidades

- Listado de seis ciudades de Chile.
- Búsqueda de ciudades por nombre o región.
- Cambio de temperatura entre Celsius y Fahrenheit.
- Vista de detalle para cada ciudad.
- Pronóstico de siete días.
- Cálculo de temperatura mínima semanal.
- Cálculo de temperatura máxima semanal.
- Cálculo de temperatura promedio semanal.
- Navegación sin recargar la página.
- Vista personalizada para rutas inexistentes.

## Vistas principales

### Home

Muestra todas las ciudades disponibles con:

- Nombre.
- Región.
- Temperatura actual.
- Condición climática.
- Humedad.
- Velocidad del viento.

### Detalle del lugar

Muestra información ampliada de una ciudad:

- Clima actual.
- Sensación térmica.
- Humedad.
- Viento.
- Pronóstico semanal.
- Temperatura mínima.
- Temperatura máxima.
- Temperatura promedio.

### Página no encontrada

Se muestra cuando el usuario ingresa una ruta que no existe.

## Rutas

| Ruta | Vista | Descripción |
| --- | --- | --- |
| `/` | HomeView | Página principal con listado de ciudades |
| `/lugar/:id` | PlaceDetailView | Detalle dinámico de una ciudad |
| `/inicio` | Redirección | Redirecciona a la página principal |
| `/:pathMatch(.*)*` | NotFoundView | Página para rutas inexistentes |

## Tecnologías utilizadas

- Vue 3
- Vue Router
- JavaScript
- HTML
- CSS
- Vite

## Instalación

Clonar el repositorio:

```bash
https://orellananayaret.github.io/app-clima-vue/