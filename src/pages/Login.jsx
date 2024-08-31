// Login.jsx
import { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="max-w-sm w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
        <InputField
          label="Nombre de Usuario"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Nombre de usuario"
        />
        <InputField
          label="Contraseña"
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Contraseña"
        />
        <Button label="Iniciar Sesión" type="submit" className="bg-blue-500 hover:bg-blue-600" />
      </form>
    </div>
  );
};

export default Login;
