import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import eventData from "../data/eventData.json"; // Asume que este es el archivo JSON que tienes

function MapComponent({ filteredData }) {
  useEffect(() => {
    // Inicializa el mapa con la vista centrada en la posición inicial y zoom.
    const map = L.map('map').setView([41.8219, 1.6556], 7.5);

    // Añade una capa de mapa con el estilo personalizado.
    const Stadia_OSMBright = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}', {
      minZoom: 0,
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      ext: 'png'
    });

    Stadia_OSMBright.addTo(map);

    // Agrupa los eventos por municipio usando los datos filtrados.
    const eventsByMunicipio = filteredData.reduce((acc, event) => {
      const municipio = event.Municipi;
      if (!acc[municipio]) {
        acc[municipio] = {
          latitud: event.Latitud,
          longitud: event.Longitud,
          count: 0
        };
      }
      acc[municipio].count += 1;
      return acc;
    }, {});

    // Define un icono personalizado para los marcadores.
    const customIcon = L.divIcon({
      className: 'custom-marker'
    });

    // Añade los marcadores para cada municipio con un popup.
    Object.entries(eventsByMunicipio).forEach(([municipio, data]) => {
      L.marker([data.latitud, data.longitud], { icon: customIcon })
        .addTo(map)
        .bindPopup(`
          <strong>${municipio}</strong><br>
          Número de visitas: ${data.count}
        `);
    });

    // Limpia el mapa cuando el componente se desmonta.
    return () => {
      map.remove();
    };
  }, [filteredData]); // Vuelve a ejecutar el efecto cuando los datos filtrados cambian

  return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
}

export default MapComponent;
