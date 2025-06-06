import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [esRegistro, setEsRegistro] = useState(false);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!correo.trim() || !contraseña.trim() || (esRegistro && !nombre.trim())) {
      alert('Por favor, completa todos los campos'); 
      return;
    }

    try {
      const endpoint = esRegistro ? 'registrar' : 'login';
      const body = esRegistro ? { nombre, correo, contraseña } : { correo, contraseña };

      const respuesta = await fetch(`https://chatbot-periodista-backend.vercel.app/api/usuarios/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!respuesta.ok) {
        const error = await respuesta.json();
        throw new Error(error.error || 'Error en la solicitud');
      }

      const datos = await respuesta.json();
      
      if (esRegistro) {
        alert('✅ Registrado exitosamente');
        setEsRegistro(false);
      } else {
        onLogin({
          id: datos.usuario?.id || datos.id,
          nombre: datos.usuario?.nombre || datos.nombre,
          correo
        });
      }

      setNombre('');
      setCorreo('');
      setContraseña('');

    } catch (error) {
      alert('❌ ' + error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>{esRegistro ? 'Registrarse' : 'Iniciar Sesión'}</h2>
      <form className="login-form" onSubmit={manejarEnvio}>
        {esRegistro && (
          <div className="login-field">
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
        )}
        <div className="login-field">
          <label>Correo Electrónico:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div className="login-field">
          <label>Contraseña:</label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        <button className="login-button" type="submit">
          {esRegistro ? 'Registrarse' : 'Entrar'}
        </button>
      </form>
      <button className="toggle-button" onClick={() => setEsRegistro(!esRegistro)}>
        {esRegistro ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
      </button>
    </div>
  );
};

export default Login;