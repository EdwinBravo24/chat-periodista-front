import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FaPaperPlane, FaRobot, FaUser, FaBuilding, FaInfoCircle } from 'react-icons/fa';

const ChatPrompt = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const messagesEndRef = useRef(null);

  // Ejemplos de consultas específicas
  const exampleQueries = [
    "¿Cuántos salones hay y cómo están distribuidos?",
    "¿Qué salones están disponibles ahora?",
    "Salones con capacidad para 30 personas",
    "¿Qué salones tienen tablero?",
    "Salones con mesas móviles",
    "¿Qué salones no tienen proyector?",
    "Salones completamente equipados",
    "Salones sin equipamiento",
    "Información de EC-2.1",
    "Salones en el piso 3"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    try {
      setIsLoading(true);
      setConversations(prev => [...prev, { role: 'user', content: prompt }]);
      setPrompt('');

      const res = await axios.post('http://localhost:5000/api/chat', { prompt });

      setConversations(prev => [...prev, {
        role: 'assistant',
        content: res.data.response,
        data: res.data.data || null
      }]);

    } catch (error) {
      console.error('Error:', error);
      setConversations(prev => [...prev, {
        role: 'error',
        content: 'Error al procesar tu solicitud'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll al final del chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations]);

  // Formatear datos de salones
  const renderSalonDetails = (salon) => (
    <div key={salon.code} className="mt-2 ml-4 p-2 bg-blue-50 rounded border border-blue-100 text-sm">
      <div className="font-medium">{salon.code} - {salon.name}</div>
      <div>📍 Piso {salon.floor} | 🪑 Capacidad: {salon.capacity}</div>
      <div>📞 Contacto: {salon.reservationContact}</div>
      <div>🔄 Estado: {salon.status} {salon.status === 'Disponible' ? '✅' : '⏳'}</div>
      {salon.equipment && <div>🛠️ Equipo: {salon.equipment}</div>}
      {salon.tableType && salon.tableType !== 'No tiene' && <div>🪑 Mesas: {salon.tableType}</div>}
      {salon.boardType && salon.boardType !== 'No tiene' && <div>📝 Tablero: {salon.boardType}</div>}
    </div>
  );

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-4 flex items-center">
        <FaBuilding className="text-2xl mr-3" />
        <div>
          <h1 className="font-bold text-lg">Asistente de Salones EC</h1>
          <p className="text-xs opacity-90">Consulta sobre disponibilidad, equipamiento y distribución</p>
        </div>
      </div>

      {/* Área de conversación */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {conversations.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-4 text-center">
            <div className="mb-6 p-4 bg-blue-100 rounded-full">
              <FaInfoCircle className="text-4xl text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-blue-800 mb-2">¿En qué puedo ayudarte?</h2>
            <p className="text-gray-600 mb-6">Consulta sobre los salones del Edificio Educación Continua</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-lg">
              {exampleQueries.map((query, i) => (
                <button
                  key={i}
                  onClick={() => setPrompt(query)}
                  className="p-2 text-sm bg-white border border-gray-200 rounded hover:bg-blue-50 transition-colors text-left"
                >
                  "{query}"
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {conversations.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-3 rounded-lg ${msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : msg.role === 'error'
                    ? 'bg-red-100 text-red-800 border border-red-200'
                    : 'bg-white border border-gray-200 rounded-bl-none shadow-xs'}`}>

                  <div className="font-medium mb-1 flex items-center">
                    {msg.role === 'user' ? (
                      <>
                        <FaUser className="mr-2" /> Tú
                      </>
                    ) : msg.role === 'assistant' ? (
                      <>
                        <FaRobot className="mr-2 text-blue-600" /> Asistente EC
                      </>
                    ) : (
                      '⚠️ Error'
                    )}
                  </div>

                  <div className="whitespace-pre-wrap">
                    {msg.content.split('\n').map((line, j) => (
                      <p key={j} className="mb-1 last:mb-0">{line}</p>
                    ))}
                    {msg.data && Array.isArray(msg.data) && (
                      <div className="mt-2">
                        {msg.data.slice(0, 3).map(renderSalonDetails)}
                        {msg.data.length > 3 && (
                          <button
                            className="text-blue-600 text-sm mt-2 underline"
                            onClick={() => {
                              // Mostrar modal o expandir para ver todos los salones
                              alert(`Se encontraron ${msg.data.length} salones en total`);
                            }}
                          >
                            Ver todos los {msg.data.length} salones
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Área de entrada */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 bg-white">
        <div className="flex items-end gap-2">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ej: ¿Qué salones tienen proyector en el piso 2?..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="2"
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="h-12 bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
          >
            <FaPaperPlane className="mr-1" /> Enviar
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1 text-center">
          {isLoading ? 'Buscando información...' : 'Escribe tu consulta sobre salones EC o presiona Enter para enviar'}
        </p>
      </form>
    </div>
  );
};

export default ChatPrompt;