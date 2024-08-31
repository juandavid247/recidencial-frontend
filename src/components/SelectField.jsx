// const SelectField = ({ label, options, value, onChange }) => {
//   return (
//     <div className="mb-4">
//       <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
//       <select
//         value={value}
//         onChange={onChange}
//         className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         {options.map(option => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default SelectField;


const SelectField = ({ id, name, label, options }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="mt-1">
      <select id={id} name={name} className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  </div>
);

export default SelectField;
