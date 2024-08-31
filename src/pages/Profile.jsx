// // Profile.jsx
// import { useState, useEffect } from 'react';
// import InputField from '../components/InputField';
// import Button from '../components/Button';
// import { faUser, faEnvelope, faPhone, faSave } from '@fortawesome/free-solid-svg-icons';

// const Profile = () => {
//   const [profile, setProfile] = useState({
//     name: '',
//     email: '',
//     phone: '',
//   });

//   useEffect(() => {
//     // Fetch user profile data here
//   }, []);

//   const handleChange = (e) => {
//     setProfile({
//       ...profile,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle profile update logic
//   };

//   return (
//     <div className="max-w-lg mx-auto p-4 bg-white rounded-md shadow-md">
//       <h2 className="text-xl font-bold mb-4">Perfil</h2>
//       <form onSubmit={handleSubmit}>
//         <InputField
//           label="Nombre"
//           name="name"
//           value={profile.name}
//           onChange={handleChange}
//           placeholder="Nombre completo"
//           icon={faUser}
//         />
//         <InputField
//           label="Correo Electrónico"
//           name="email"
//           type="email"
//           value={profile.email}
//           onChange={handleChange}
//           placeholder="Correo electrónico"
//           icon={faEnvelope}
//         />
//         <InputField
//           label="Teléfono"
//           name="phone"
//           type="tel"
//           value={profile.phone}
//           onChange={handleChange}
//           placeholder="Número de teléfono"
//           icon={faPhone}
//         />
//         <Button
//           label="Actualizar"
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-600"
//           icon={faSave}
//         />
//       </form>
//     </div>
//   );
// };

// export default Profile;

import  { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(profile);
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900">Profile</h1>
      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        <InputField id="name" name="name" type="text" label="Name" value={profile.name} onChange={handleChange} />
        <InputField id="email" name="email" type="email" label="Email address" value={profile.email} onChange={handleChange} />
        <InputField id="phone" name="phone" type="tel" label="Phone number" value={profile.phone} onChange={handleChange} />
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};

export default Profile;
