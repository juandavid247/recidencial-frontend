// // InputField.jsx
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const InputField = ({ label, name, value, onChange, placeholder, type = 'text', icon }) => {
//   return (
//     <div className="mb-4">
//       <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
//       <div className="flex items-center border rounded-md shadow-sm">
//         {icon && <FontAwesomeIcon icon={icon} className="ml-2 text-gray-500" />}
//         <input
//           type={type}
//           name={name}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           className="w-full p-2 outline-none rounded-md"
//         />
//       </div>
//     </div>
//   );
// };

// export default InputField;


const InputField = ({ id, name, type, label, value, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="mt-1">
      <input id={id} name={name} type={type} value={value} onChange={onChange} className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
    </div>
  </div>
);

export default InputField;
