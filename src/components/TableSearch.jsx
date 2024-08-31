import PropTypes from 'prop-types';

const TableSearch = ({ results }) => (
  <div className="mt-6">
    <h2 className="text-2xl font-semibold text-gray-900">Search Results</h2>
    <table className="min-w-full divide-y divide-gray-200 mt-4">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Primer Nombre
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Segundo Nombre
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Telefono
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
             Apartamento
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Parqueadero
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
             Placa
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 rounded-md">
        {results.map((result, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.first_name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.last_name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.phone}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.apartment_number}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.space_number}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.license_plate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

TableSearch.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      apartment_number: PropTypes.string.isRequired,
      space_number: PropTypes.string,
      license_plate: PropTypes.string,
    })
  ).isRequired,
};

export default TableSearch;
