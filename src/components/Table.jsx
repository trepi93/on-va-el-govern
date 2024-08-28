import React, { useState, useEffect } from 'react';
import { Table } from 'flowbite-react';

const DataTable = ({ filteredData }) => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });


  const prepareTableData = () => {
    return filteredData.map(event => {

      const date = event["Data"].split(' ')[0];

      return {
        date: date,
        description: event["Acte"],
        attendees: event["Càrrec"]
      };
    });
  };

  useEffect(() => {
    const preparedData = prepareTableData();
    setData(preparedData);
  }, [filteredData]); 

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (name) => {
    if (!sortConfig.key) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div className="rounded-lg shadow-lg">
      <Table className="min-w-full bg-transparent">
        <Table.Head className="bg-[#222222]">
          <Table.HeadCell
            onClick={() => requestSort('date')}
            className={`text-gray-300 cursor-pointer text-sm ${getClassNamesFor('date')}`}
          >
            Data
          </Table.HeadCell>
          <Table.HeadCell
            onClick={() => requestSort('description')}
            className={`text-gray-300 cursor-pointer text-sm ${getClassNamesFor('description')}`}
          >
            Descripció de l'Acte
          </Table.HeadCell>
          <Table.HeadCell
            onClick={() => requestSort('attendees')}
            className={`text-gray-300 cursor-pointer text-sm ${getClassNamesFor('attendees')}`}
          >
            Qui hi ha anat
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y divide-gray-700 bg-transparent">
          {sortedData.map((row, index) => (
            <Table.Row key={index} className="hover:bg-gray-700 bg-transparent">
              <Table.Cell className="text-white font-medium text-sm">
                {row.date}
              </Table.Cell>
              <Table.Cell className="text-gray-300 text-sm">
                {row.description}
              </Table.Cell>
              <Table.Cell className="text-gray-300 text-sm">
                {row.attendees}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default DataTable;
