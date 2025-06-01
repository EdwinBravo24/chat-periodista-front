// Chat.js
import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';

function Chat({ usuario }) {
  const [messages, setMessages] = useState([]); // Mensajes con sender y text
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Para mostrar carga inicial
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // NUEVA FUNCIÓN: Cargar historial del usuario al iniciar
  const cargarHistorial = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://chatbot-periodista-backend.vercel.app/api/chat/historial/${usuario.id}`);
      
      if (response.ok) {
        const historial = await response.json();
        setMessages(historial); // Cargamos el historial previo
        console.log('Historial cargado:', historial.length, 'mensajes');
      } else {
        console.log('No hay historial previo o error al cargar');
        setMessages([]); // Si no hay historial, array vacío
      }
    } catch (error) {
      console.error('Error cargando historial:', error);
      setMessages([]); // En caso de error, array vacío
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar el historial cuando el componente se monte
  useEffect(() => {
    if (usuario && usuario.id) {
      cargarHistorial();
    }
  }, [usuario]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    // Añadimos mensaje usuario a UI
    const newUserMessage = { sender: 'user', text: input };
    const newMessages = [...messages, newUserMessage];
    setMessages(newMessages);
    setInput('');

    try {
      // Filtrar mensajes que tienen texto válido y crear formato OpenAI
      const historialOpenAI = newMessages
        .filter(msg => msg.text && typeof msg.text === 'string' && msg.text.trim() !== '')
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text.trim()
        }));

      // Enviar historial al backend CON usuarioId
      const response = await fetch('https://chatbot-periodista-backend.vercel.app/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          historial: historialOpenAI, 
          usuario: usuario.nombre,
          usuarioId: usuario.id // Enviamos el ID del usuario
        }),
      });

      if (!response.ok) throw new Error('Error en la respuesta del servidor');

      const data = await response.json();
      // Añadir respuesta bot a UI
      const botMessage = { sender: 'bot', text: data.respuesta };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { sender: 'bot', text: 'Error al conectar con el servidor.' };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // NUEVA FUNCIÓN: Limpiar chat (opcional)
  const limpiarChat = () => {
    if (window.confirm('¿Estás seguro de que quieres limpiar el chat? Esto no borrará tu historial guardado.')) {
      setMessages([]);
    }
  };

  if (isLoading) {
    return (
      <div className="chat-container">
        <div className="loading">Cargando tu historial de conversaciones...</div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat Deportivo - {usuario.nombre}</h2>
        <button onClick={limpiarChat} className="clear-chat-btn">
          Limpiar Vista
        </button>
      </div>
      
      <div className="chat-box">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <p>¡Hola {usuario.nombre}! Soy Simón, tu periodista deportivo. ¿De qué deporte quieres hablar hoy?</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={msg.sender === 'user' ? 'user-msg' : 'bot-msg'}>
              <strong>{msg.sender === 'user' ? 'Tú:' : 'Simón:'}</strong> {msg.text}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat-input">
        <input
          type="text"
          placeholder="Pregúntame sobre deportes..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading || input.trim() === ''}>
          Enviar
        </button>
      </div>
    </div>
  );
}

export default Chat;