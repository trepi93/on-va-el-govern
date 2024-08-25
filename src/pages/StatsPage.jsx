import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import DropdownFilter from '../components/DropdownFilter';
import DataTable from '../components/Table';
import { vegueriaOptions, comarcaOptions, vegueriaToComarcaMap, ministerOptions } from '../components/EventData';
import MapComponent from '../components/Map';
import eventData from '../data/eventData.json';

const StatsPage = () => {
  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [vegueria, setVegueria] = useState(null);
  const [comarca, setComarca] = useState(null);
  const [minister, setMinister] = useState(null);
  const [filteredComarcaOptions, setFilteredComarcaOptions] = useState(comarcaOptions); // Por defecto, todas las comarcas
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(eventData); // Inicialmente, muestra todos los datos
  }, []);

  useEffect(() => {
    handleSearch(); // Aplica el filtro cada vez que cambian los filtros
  }, [searchText, startDate, endDate, vegueria, comarca, minister]);

  useEffect(() => {
    if (vegueria) {
      const availableComarcas = vegueriaToComarcaMap[vegueria.value] || [];
      setFilteredComarcaOptions(comarcaOptions.filter(c => availableComarcas.includes(c.value)));
      setComarca(null); // Reinicia la selección de comarca
    } else {
      setFilteredComarcaOptions(comarcaOptions); // Si no hay vegueria seleccionada, muestra todas las comarcas
      setComarca(null);
    }
  }, [vegueria]);

  const handleSearch = () => {
    let filtered = [...eventData];

    if (searchText) {
      filtered = filtered.filter(item =>
        item.Acte.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (startDate) {
      filtered = filtered.filter(item => new Date(item.Data) >= new Date(startDate));
    }

    if (endDate) {
      filtered = filtered.filter(item => new Date(item.Data) <= new Date(endDate));
    }

    if (vegueria) {
      filtered = filtered.filter(item => item.Vegueria === vegueria.value);
    }

    if (comarca) {
      filtered = filtered.filter(item => item.Comarca === comarca.value);
    }

    if (minister) {
      filtered = filtered.filter(item => item.Càrrec === minister.value);
    }

    setFilteredData(filtered); // Actualiza los datos filtrados
  };

  return (
    <div>
      <header>
        <nav className="navbar">
          <div className="logo-container">
            <div className="logo">
              <a href="/"><img src="assets/logoECO_blanc.png" alt="Logo" /></a>
            </div>
            <div className="menu-icon" id="menuIcon">
              <span className="material-symbols-outlined">menu</span>
            </div>
          </div>
          <div className="nav-links" id="navLinks">
            <a href="#">EstratECO</a>
            <a href="#">Qui som</a>
            <a href="#">Nota metodològica</a>
          </div>
        </nav>
      </header>

      <div className="filter-container">
        <div className="filter-row">
          <div className="filter">
            <label htmlFor="searchEvent">Cerca per text</label>
            <input
              type="text"
              id="searchEvent"
              name="searchEvent"
              className="form-control"
              placeholder="Introdueix text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="filter">
            <label htmlFor="startDate">Data d'inici</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="filter">
            <label htmlFor="endDate">Data final</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="filter">
            <label htmlFor="vegueria">Vegueria</label>
            <DropdownFilter options={vegueriaOptions} selectedOption={vegueria} onSelect={setVegueria} />
          </div>
          <div className="filter">
            <label htmlFor="comarca">Comarca</label>
            <DropdownFilter options={filteredComarcaOptions} selectedOption={comarca} onSelect={setComarca} />
          </div>
          <div className="filter">
            <label htmlFor="minister">Conseller/a</label>
            <DropdownFilter options={ministerOptions} selectedOption={minister} onSelect={setMinister} />
          </div>
        </div>
      </div>

      <div className="stats-container">
        <div id="map" style={{ height: "400px", width: "100%" }}>
          <MapComponent filteredData={filteredData} />
        </div>
        <div className="bar-chart">
          <BarChart filteredData={filteredData}/>
        </div>
        <div className="pie-chart">
          <PieChart data={filteredData} vegueria={vegueria} comarca={comarca} />
        </div>
        <div className="event-table">
          <DataTable filteredData={filteredData} />
        </div>
      </div>

      <footer>
        <h6 className='custom-h6'>Copyright © 2024 Estratègia, Comunicació i Oratòria S.L. Tots els drets reservats.</h6>
      </footer>
    </div>
  );
};

export default StatsPage;
