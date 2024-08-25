export const comarcaOptions = [
            { value: 'Pallars Jussà', label: 'Pallars Jussà' },
            { value: 'Baix Llobregat', label: 'Baix Llobregat' },
            { value: 'Noguera', label: 'Noguera' },
            { value: 'Urgell', label: 'Urgell' },
            { value: 'Bages', label: 'Bages' },
            { value: 'Alt Empordà', label: 'Alt Empordà' },
            { value: 'Vallès Oriental', label: 'Vallès Oriental' },
            { value: 'Alt Camp', label: 'Alt Camp' },
            { value: 'Gironès', label: 'Gironès' },
            { value: 'Segrià', label: 'Segrià' },
            { value: 'Alt Urgell', label: 'Alt Urgell' },
            { value: 'Garrigues', label: 'Garrigues' },
            { value: 'Baix Penedès', label: 'Baix Penedès' },
            { value: 'Baix Camp', label: 'Baix Camp' },
            { value: 'Baix Empordà', label: 'Baix Empordà' },
            { value: 'Montsià', label: 'Montsià' },
            { value: 'Baix Ebre', label: 'Baix Ebre' },
            { value: 'Maresme', label: 'Maresme' },
            { value: 'Pallars Sobirà', label: 'Pallars Sobirà' },
            { value: 'Cerdanya', label: 'Cerdanya' },
            { value: 'Osona', label: 'Osona' },
            { value: 'Tarragonès', label: 'Tarragonès' },
            { value: 'Selva', label: 'Selva' },
            { value: 'Garrotxa', label: 'Garrotxa' },
            { value: 'Anoia', label: 'Anoia' },
            { value: 'Terra Alta', label: 'Terra Alta' },
            { value: 'Aran', label: 'Aran' },
            { value: 'Ribera d\'Ebre', label: 'Ribera d\'Ebre' },
            { value: 'Berguedà', label: 'Berguedà' },
            { value: 'Alt Penedès', label: 'Alt Penedès' },
            { value: 'Barcelonès', label: 'Barcelonès' },
            { value: 'Vallès Occidental', label: 'Vallès Occidental' },
            { value: 'Pla de l\'Estany', label: 'Pla de l\'Estany' },
            { value: 'Pla d\'Urgell', label: 'Pla d\'Urgell' },
            { value: 'Conca de Barberà', label: 'Conca de Barberà' },
            { value: 'Priorat', label: 'Priorat' },
            { value: 'Segarra', label: 'Segarra' },
            { value: 'Moianès', label: 'Moianès' },
            { value: 'Ripollès', label: 'Ripollès' },
            { value: 'Garraf', label: 'Garraf' },
            { value: 'Solsonès', label: 'Solsonès' },
            { value: 'Alta Ribagorça', label: 'Alta Ribagorça' }
  ];
  
  comarcaOptions.sort((a, b) => a.label.localeCompare(b.label));


  export const vegueriaOptions = [
            { value:'Alt Pirineu', label: 'Alt Pirineu'},
            { value:'Barcelona', label: 'Barcelona'},
            { value:'Lleida', label: 'Lleida'},
            { value:'Catalunya Central', label: 'Catalunya Central'},
            { value:'Girona', label: 'Girona'},
            { value:'Camp de Tarragona', label: 'Camp de Tarragona'},
            { value:'Penedès', label: 'Penedès'}
  ];
  vegueriaOptions.sort((a, b) => a.label.localeCompare(b.label));

  export const ministerOptions = [
            { value:'Salvador Illa', label: 'Salvador Illa'},
            { value:'Albert Dalmau', label: 'Albert Dalmau'},
            { value:'Alícia Romero', label: 'Alícia Romero'},
            { value:'Núria Parlon', label: 'Núria Parlon'},
            { value:'Ramon Espadaler', label: 'Ramon Espadaler'},
            { value:'Sílvia Paneque', label: 'Sílvia Paneque'},
            { value:'Olga Pané', label: 'Olga Pané'},
            { value:'Esther Niubó', label: 'Esther Niubó'},
            { value:'Mònica Martínez', label: 'Mònica Martínez'},
            { value:'Miquel Sàmper', label: 'Miquel Sàmper'},
            { value:'Eva Menor', label: 'Eva Menor'},
            { value:'Jaume Duch', label: 'Jaume Duch'},
            { value:'Núria Montserrat', label: 'Núria Montserrat'},
            { value:'Òscar Ordeig', label: 'Òscar Ordeig'},
            { value:'Bernardo Álvarez', label: 'Bernardo Álvarez'},
            { value:'Sònia Hernández', label: 'Sònia Hernández'},
            { value:'Francesc Xavier Vila', label: 'Francesc Xavier Vila'},
  ];

  ministerOptions.sort((a, b) => a.label.localeCompare(b.label));

  export const vegueriaToComarcaMap = {
    'Alt Pirineu': ['Pallars Jussà', 'Pallars Sobirà', 'Alt Urgell', 'Cerdanya', 'Alta Ribagorça', 'Aran'],
    'Barcelona': ['Barcelonès', 'Vallès Occidental', 'Baix Llobregat', 'Vallès Oriental', 'Maresme'],
    'Lleida': ['Segrià', 'Noguera', 'Garrigues', 'Pla d\'Urgell', 'Urgell', 'Segarra', 'Solsonès'],
    'Catalunya Central': ['Bages', 'Anoia', 'Moianès', 'Osona', 'Berguedà', 'Solsonès'],
    'Girona': ['Alt Empordà', 'Baix Empordà', 'Gironès', 'Pla de l\'Estany', 'Ripollès', 'Garrotxa', 'Selva'],
    'Camp de Tarragona': ['Alt Camp', 'Baix Camp', 'Tarragonès', 'Priorat', 'Conca de Barberà'],
    'Penedès': ['Alt Penedès', 'Garraf', 'Anoia', 'Baix Penedès'],
  };
