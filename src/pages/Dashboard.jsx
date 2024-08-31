// // Dashboard.jsx
// import Header from '../components/Header';
// import Sidebar from '../components/Sidebar';
// import Footer from '../components/Footer';

// const Dashboard = () => {
//   return (
//     <div className="flex flex-col h-screen">
//       <Header />
//       <div className="flex flex-1">
//         <Sidebar />
//         <main className="flex-1 p-6">
//           <h1 className="text-2xl font-bold">Panel de Administración</h1>
//           {/* Contenido del Dashboard */}
//         </main>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Dashboard;

import ResidentForm from '../components/ResidentsTable';
import VehiclesForm from '../components/VehiclesTable';

const Dashboard = () => (
  <div>
    <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
    <ResidentForm />
    <VehiclesForm />
  </div>
);

export default Dashboard;
