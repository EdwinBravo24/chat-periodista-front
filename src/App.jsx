// App.js
import React, { useState } from 'react';
import Login from './Login';
import Chat from './Chat';

function App() {
  const [usuario, setUsuario] = useState(null);

  const handleLogin = (datos) => {
    setUsuario(datos);
    console.log('Usuario logueado:', datos);
  };

  const handleLogout = async () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión? Te enviaremos tu historial por email.')) {
      try {
        // Llamar al endpoint de logout
        const response = await fetch('https://chatbot-periodista-backend.vercel.app/api/usuarios/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ usuarioId: usuario.id }),
        });

        const data = await response.json();
        
        if (response.ok) {
          let mensaje = 'Sesión cerrada exitosamente.';
          if (data.historialEnviado) {
            mensaje += `\n📧 Tu historial (${data.totalMensajes} conversaciones) ha sido enviado a ${usuario.correo}`;
          } else {
            mensaje += '\n⚠️ ' + data.detalleEmail;
          }
          alert(mensaje);
        } else {
          alert('Error al cerrar sesión: ' + data.error);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión al cerrar sesión');
      }
      
      setUsuario(null);
    }
  };

  return (
    <div className="app">
      {usuario ? (
        <div>
          <div className="user-header">
            <div className="user-info">
              <h1>Bienvenido, {usuario.nombre}!</h1>
              <p>Correo: {usuario.correo}</p>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
          <Chat usuario={usuario} />
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;