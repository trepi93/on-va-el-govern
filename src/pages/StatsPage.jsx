import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import DropdownFilter from '../components/DropdownFilter';
import DataTable from '../components/Table';
import { vegueriaOptions, comarcaOptions, vegueriaToComarcaMap, ministerOptions } from '../components/EventData';
import MapComponent from '../components/Map';
import eventData from '../data/eventData.json';

const StatsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ministerParam = queryParams.get('minister');

  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [vegueria, setVegueria] = useState(null);
  const [comarca, setComarca] = useState(null);
  const [minister, setMinister] = useState(ministerParam ? { value: ministerParam, label: ministerParam } : null);
  const [filteredComarcaOptions, setFilteredComarcaOptions] = useState(comarcaOptions);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMinisterData, setSelectedMinisterData] = useState(null);
  const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(false);
  const [isNavMenuVisible, setIsNavMenuVisible] = useState(false);

  const getMinisterData = (ministerName) => {
    switch (ministerName) {
        case 'Salvador Illa':
            return {
                photo: '/assets/salvador_illa.png',
                name: "Salvador Illa",
                role: 'President de la Generalitat de Catalunya'
            };
        case 'Albert Dalmau':
            return {
                photo: '/assets/albert_dalmau.png',
                name: "Albert Dalmau",
                role: 'Conseller de la Presidència'
            };
        case 'Alícia Romero':
            return {
                photo: '/assets/alícia_romero.png',
                name: "Alícia Romero",
                role: 'Consellera d\'Economia i Finances'
            };
        case 'Núria Parlon':
            return {
                photo: '/assets/núria_parlon.png',
                name: "Núria Parlon",
                role: 'Consellera d\'Interior i Seguretat Pública'
            };
        case 'Ramon Espadaler':
            return {
                photo: '/assets/ramon_espadaler.png',
                name: "Ramon Espadaler",
                role: 'Conseller de Justícia i Qualitat Democràtica'
            };
        case 'Sílvia Paneque':
            return {
                photo: '/assets/sílvia_paneque.png',
                name: "Sílvia Paneque",
                role: 'Consellera de Territori, Habitatge i Transició Ecològica'
            };
        case 'Olga Pané':
            return {
                photo: '/assets/olga_pané.png',
                name: "Olga Pané",
                role: 'Consellera de Salut'
            };
        case 'Esther Niubó':
            return {
                photo: '/assets/esther_niubó.png',
                name: "Esther Niubó",
                role: 'Consellera d\'Educació i Formació Professional'
            };
        case 'Mònica Martínez':
            return {
                photo: '/assets/mònica_martínez.png',
                name: "Mònica Martínez",
                role: 'Consellera de Drets Socials i Inclusió'
            };
        case 'Miquel Sàmper':
            return {
                photo: '/assets/miquel_sàmper.png',
                name: "Miquel Sàmper",
                role: 'Conseller d\'Empresa i Treball'
            };
        case 'Eva Menor':
            return {
                photo: '/assets/eva_menor.png',
                name: "Eva Menor",
                role: 'Consellera d\'Igualtat i Feminisme'
            };
        case 'Jaume Duch':
            return {
                photo: '/assets/jaume_duch.png',
                name: "Jaume Duch",
                role: 'Conseller d\'Unió Europea i Acció Exterior'
            };
        case 'Núria Montserrat':
            return {
                photo: '/assets/núria_montserrat.png',
                name: "Núria Montserrat",
                role: 'Consellera de Recerca i Universitats'
            };
        case 'Òscar Ordeig':
            return {
                photo: '/assets/òscar_ordeig.png',
                name: "Òscar Ordeig",
                role: 'Conseller d\'Agricultura, Ramaderia, Pesca i Alimentació'
            };
        case 'Bernardo Álvarez':
            return {
                photo: '/assets/bernardo_álvarez.png',
                name: "Bernardo Álvarez",
                role: 'Conseller d\'Esports'
            };
        case 'Sònia Hernández':
            return {
                photo: '/assets/sònia_hernández.png',
                name: "Sònia Hernández",
                role: 'Consellera de Cultura'
            };
        case 'Francesc Xavier Vila':
            return {
                photo: '/assets/francesc_xavier_vila.png',
                name: "Francesc Xavier Vila",
                role: 'Conseller de Política Lingüística'
            };
        default:
            return {
                photo: '',
                role: ''
            }; // Retorna cadenes buides si no es troba el nom
    }
};

  useEffect(() => {
    setFilteredData(eventData);
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchText, startDate, endDate, vegueria, comarca, minister]);

  useEffect(() => {
    if (vegueria) {
      const availableComarcas = vegueriaToComarcaMap[vegueria.value] || [];
      setFilteredComarcaOptions(comarcaOptions.filter(c => availableComarcas.includes(c.value)));
      setComarca(null);
    } else {
      setFilteredComarcaOptions(comarcaOptions);
      setComarca(null);
    }
  }, [vegueria]);

  useEffect(() => {
    if (ministerParam) {
      setMinister({ value: ministerParam, label: ministerParam });
    }
  }, [ministerParam]);

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
      if (filtered.length > 0) {
        // Obtenim la foto i el càrrec del conseller seleccionat
        const { photo, name, role } = getMinisterData(minister.value);

        setSelectedMinisterData({
          name: name,
          role: role,
          photo: photo,
          eventCount: filtered.length,
        });
      } else {
        setSelectedMinisterData(null);
      }
    } else {
      setSelectedMinisterData(null);
    }

    setFilteredData(filtered);
};
console.log(selectedMinisterData)

  const toggleFilterMenu = () => {
    setIsFilterMenuVisible(!isFilterMenuVisible);
  };

  const toggleNavMenu = () => {
    setIsNavMenuVisible(!isNavMenuVisible);
  };

  const closeMenus = (event) => {
    if (event.target.closest('.floating-filter-menu') === null && event.target.closest('.toggle-filter-menu') === null) {
      setIsFilterMenuVisible(false);
    }
    if (event.target.closest('.nav-links') === null && event.target.closest('#menuIcon') === null) {
      setIsNavMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeMenus);
    return () => {
      document.removeEventListener('click', closeMenus);
    };
  }, []);

  return (
    <div>
      <header>
        <nav className="navbar">
          <div className="logo-container">
            <div className="logo">
              <a href="/"><img src="assets/logoECO_blanc.png" alt="Logo" /></a>
            </div>
            <div className="menu-icon" id="menuIcon" onClick={toggleNavMenu}>
              <span className="material-symbols-outlined">menu</span>
            </div>
          </div>
          <div className={`nav-links ${isNavMenuVisible ? 'show' : ''}`} id="navLinks">
            <a href="#">EstratECO</a>
            <a href="https://www.femeco.cat/index.php/ca/">Qui som</a>
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

      <div className="floating-filter-button">
        <button className="toggle-filter-menu" onClick={toggleFilterMenu}>
          {isFilterMenuVisible ? 'Amaga Filtres' : 'Mostra Filtres'}
        </button>
      </div>

      <div className={`floating-filter-menu ${isFilterMenuVisible ? 'visible' : ''}`}>
        <div className="filter-close-button">
          <button className="close-filter-menu" onClick={toggleFilterMenu}>
            &times; {/* Aquest és el símbol de la creu */}
          </button>
        </div>
        <div className="filter">
          <label htmlFor="searchEventFloating">Cerca per text</label>
          <input
            type="text"
            id="searchEventFloating"
            name="searchEventFloating"
            className="form-control"
            placeholder="Introdueix text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="filter">
          <label htmlFor="startDateFloating">Data d'inici</label>
          <input
            type="date"
            id="startDateFloating"
            name="startDateFloating"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="filter">
          <label htmlFor="endDateFloating">Data final</label>
          <input
            type="date"
            id="endDateFloating"
            name="endDateFloating"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="filter">
          <label htmlFor="vegueriaFloating">Vegueria</label>
          <DropdownFilter options={vegueriaOptions} selectedOption={vegueria} onSelect={setVegueria} />
        </div>
        <div className="filter">
          <label htmlFor="comarcaFloating">Comarca</label>
          <DropdownFilter options={filteredComarcaOptions} selectedOption={comarca} onSelect={setComarca} />
        </div>
        <div className="filter">
          <label htmlFor="ministerFloating">Conseller/a</label>
          <DropdownFilter options={ministerOptions} selectedOption={minister} onSelect={setMinister} />
        </div>
      </div>

      <div className="stats-container">
        <div id="map" style={{ height: "400px", width: "100%" }}>
          <MapComponent filteredData={filteredData} selectedVegueria={vegueria} />
        </div>
        {!selectedMinisterData && (
        <div className="bar-chart">
          <BarChart filteredData={filteredData} />
        </div>
      )}

      {selectedMinisterData && (
        <div className="minister-info">
          <img src={selectedMinisterData.photo} alt={selectedMinisterData.name} />
          <h3>{selectedMinisterData.name}</h3>
          <h3>{selectedMinisterData.role}</h3>
          <h3>Nombre d'actes: {selectedMinisterData.eventCount}</h3>
        </div>
        
      )}
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
