// // Button.jsx
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const Button = ({ label, type, className, icon }) => {
//   return (
//     <button type={type} className={`px-4 py-2 rounded-md text-white ${className}`}>
//       {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
//       {label}
//     </button>
//   );
// };

// export default Button;


const Button = ({ type, children }) => (
  <div>
    <button type={type} className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      {children}
    </button>
  </div>
);

export default Button;
