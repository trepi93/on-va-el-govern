import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles_index.css'; 

const IndexPage = () => {

  const navigate = useNavigate();

  const handleImageClick = (minister) => {
    navigate(`/stats?minister=${minister}`);
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const images = document.querySelectorAll('.custom-fade-in');
    const textElements = document.querySelectorAll('.custom-slide-in');
    const button = document.querySelector('.custom-btn');

    images.forEach((img, index) => {
      setTimeout(() => {
        img.classList.add('show');
      }, index * 60);
    });

    setTimeout(() => {
      textElements.forEach((text, index) => {
        setTimeout(() => {
          text.classList.add('show');
        }, index * 50);
      });
    }, images.length * 50);

    setTimeout(() => {
      button.classList.add('show');
    }, images.length * 100 + textElements.length * 100);

    return () => {
    };

  }, 
  []);

    return (
    <div>
      <header>
        <nav className="custom-navbar">
          <div className="custom-logo-container">
            <div className="custom-logo">
              <img src="/assets/logoECO_blanc.png" alt="Logo" />
            </div>
            <div className="custom-menu-icon" id="menuIcon" onClick={toggleMenu}>
              <span className="material-symbols-outlined">menu</span>
            </div>
          </div>
          <div className={`custom-nav-links ${menuOpen ? 'show' : ''}`} id="navLinks">
            <a href="#">EstratECO</a>
            <a href="https://www.femeco.cat/index.php/ca/">Qui som</a>
            <a href="#">Nota metodològica</a>
          </div>
        </nav>
      </header>

      <div className="custom-container">
        <div className="custom-first-row">
          <div className="custom-img-container">  
            <img src="/assets/salvador_illa.png" alt="Imatge de Salvador Illa, president de Catalunya" className="custom-fade-in custom-img" onClick={() => handleImageClick('Salvador Illa')}/>
            <div className="overlay">Salvador Illa</div>
          </div>
          <h1 className="custom-slide-in">On va el Govern?</h1>
        </div>

        <div className="custom-second-row">
          <div className="custom-img-container">
            <img src="/assets/albert_dalmau.png" alt="Imatge d'Albert Dalmau, conseller de la Presidència" className="custom-fade-in custom-img" onClick={() => handleImageClick('Albert Dalmau')} />
            <div className="overlay">Albert Dalmau</div>
          </div>
          <div className="custom-img-container">
            <img src="/assets/alícia_romero.png" alt="Imatge d'Alícia Romero, consellera d'Economia i Finances" className="custom-fade-in custom-img" onClick={() => handleImageClick('Alícia Romero')} />
            <div className="overlay">Alícia Romero</div>
          </div>
          <div className="custom-img-container">
            <img src="/assets/núria_parlon.png" alt="Imatge de Núria Parlon, consellera d'Interior i Seguretat Pública" className="custom-fade-in custom-img" onClick={() => handleImageClick('Núria Parlon')} />
            <div className="overlay">Núria Parlon</div>
          </div>
          <div className="custom-img-container">
            <img src="/assets/ramon_espadaler.png" alt="Imatge de Ramon Espadaler, conseller de Justícia i Qualitat Democràtica" className="custom-fade-in custom-img" onClick={() => handleImageClick('Ramon Espadaler')} />
            <div className="overlay">Ramon Espadaler</div>
          </div>
          <div className="custom-img-container">
            <img src="/assets/sílvia_paneque.png" alt="Imatge de Sílvia Paneque, consellera de Territori, Habitatge i Transició Ecològica, i portaveu del Govern de la Generalitat de Catalunya" className="custom-fade-in custom-img" onClick={() => handleImageClick('Sílvia Paneque')} />
            <div className="overlay">Sílvia Paneque</div>
          </div>
          <div className="custom-img-container">
            <img src="/assets/olga_pané.png" alt="Imatge d'Olga Pané, consellera de Salut de la Generalitat de Catalunya" className="custom-fade-in custom-img" onClick={() => handleImageClick('Olga Pané')} />
            <div className="overlay">Olga Pané</div>
          </div>
          <div className="custom-img-container">
            <img src="/assets/esther_niubó.png" alt="Imatge d'Esther Niubó, consellera d'Educació i Formació Professional de la Generalitat de Catalunya" className="custom-fade-in custom-img" onClick={() => handleImageClick('Esther Niubó')} />
            <div className="overlay">Esther Niubó</div>
          </div>
          <div className="custom-img-container">
            <img src="/assets/mònica_martínez.png" alt="Imatge de Mònica Martínez, consellera de Drets Socials i Inclusió de la Generalitat de Catalunya" className="custom-fade-in custom-img" onClick={() => handleImageClick('Mònica Martínez')} />
            <div className="overlay">Mònica Martínez</div>
          </div>
          <div className="custom-img-container">
            <img src="/assets/miquel_sàmper.png" alt="Imatge de Miquel Sàmper, conseller d'Empresa i Treball de la Generalitat de Catalunya" className="custom-fade-in custom-img" onClick={() => handleImageClick('Miquel Sàmper')} />
            <div className="overlay">Miquel Sàmper</div>
          </div>
          <div className="custom-img-container">
            <img src="/assets/eva_menor.png" alt="Imatge d'Eva Menor, consellera d'Igualtat i Feminisme de la Generalitat de Catalunya" className="custom-fade-in custom-img" onClick={() => handleImageClick('Eva Menor')} />
            <div className="overlay">Eva Menor</div>
          </div>
          <div className="custom-img-container">
            <img src="/assets/jaume_duch.png" alt="Imatge de Jaume Duch, conseller d'Unió Europea i Acció Exterior de la Generalitat de Catalunya" className="custom-fade-in custom-img" onClick={() => handleImageClick('Jaume Duch')} />
            <div className="overlay">Jaume Duch</div>
          </div>
          <div className="custom-img-container">
            <img src="/assets/núria_montserrat.png" alt="Imatge de Núria Montserrat, consellera de Recerca i Universitats de la Generalitat de Catalunya" className="custom-fade-in custom-img" onClick={() => handleImageClick('Núria Montserrat')} />
            <div className="overlay">Núria Montserrat</div>
          </div>
          <div className="custom-img-container">
            <img src="/assets/òscar_ordeig.png" alt="Imatge d'Òscar Ordeig, conseller d'Agricultura, Ramaderia, Pesca i Alimentació de la Generalitat de Catalunya" className="custom-fade-in custom-img" onClick={() => handleImageClick('Òscar Ordeig')} />
            <div className="overlay">Òscar Ordeig</div>
          </div>
          <div className="custom-img-container">
            <img src="/assets/bernardo_álvarez.png" alt="Imatge de Bernardo Álvarez, conseller d'Esports de la Generalitat de Catalunya" className="custom-fade-in custom-img" onClick={() => handleImageClick('Bernardo Álvarez')} />
            <div className="overlay">Bernardo Álvarez</div>
          </div>
          <div className="custom-img-container">
            <img src="/assets/sònia_hernández.png" alt="Imatge de Sònia Hernández, consellera de Cultura de la Generalitat de Catalunya" className="custom-fade-in custom-img" onClick={() => handleImageClick('Sònia Hernández')} />
            <div className="overlay">Sònia Hernández</div>
          </div>
          <div className="custom-img-container">
            <img src="/assets/francesc_xavier_vila.png" alt="Imatge de Francesc Xavier Vila, conseller de Política Lingüística" className="custom-fade-in custom-img" onClick={() => handleImageClick('Francesc Xavier Vila')} />
            <div className="overlay">Francesc Xavier Vila</div>
          </div>
        </div>

        <div className="custom-text-overlay">
          <a href="/stats" className="custom-btn">Descobreix-ho</a>
        </div>
      </div>

      <footer className="custom-footer">
        <h6 className='custom-h6'>Copyright © 2024 Estratègia, Comunicació i Oratòria S.L. Tots els drets reservats.</h6>
      </footer>
    </div>
  );
};

export default IndexPage;
