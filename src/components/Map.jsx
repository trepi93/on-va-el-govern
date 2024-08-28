import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const vegueriaCoordinates = {
  'Alt Pirineu': [42.5, 1.5],
  'Barcelona': [41.3851, 2.1734],
  'Lleida': [41.6176, 0.6200],
  'Catalunya Central': [41.9266, 1.7285],
  'Girona': [41.9794, 2.8214],
  'Camp de Tarragona': [41.1167, 1.25],
  'Penedès': [41.35, 1.7]
};

function MapComponent({ filteredData, selectedVegueria }) {
  useEffect(() => {
    const map = L.map('map', { zoomAnimation: false }).setView([41.8219, 1.6556], 7.5);
  
    const Stadia_OSMBright = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}', {
      minZoom: 0,
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      ext: 'png'
    });
  
    Stadia_OSMBright.addTo(map);
  

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
  

    const customIcon = L.divIcon({
      className: 'custom-marker'
    });
  
    Object.entries(eventsByMunicipio).forEach(([municipio, data]) => {
      L.marker([data.latitud, data.longitud], { icon: customIcon })
        .addTo(map)
        .bindPopup(`
          <strong>${municipio}</strong><br>
          Total d'actes: ${data.count}
        `);
    });
  

    map.whenReady(() => {
      if (selectedVegueria && vegueriaCoordinates[selectedVegueria.value]) {
        map.setView(vegueriaCoordinates[selectedVegueria.value], 9);
      }
    });
  
    return () => {
      map.remove();
    };
  }, [filteredData, selectedVegueria]);

  return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
}

export default MapComponent;
