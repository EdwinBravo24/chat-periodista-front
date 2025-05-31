import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatPrompt from './components/ChatPrompt';
import './App.css';

function App() {
  const [selectedRoom, setSelectedRoom] = useState('');
  const navigate = useNavigate();

  const buildings = {
    "Educación Continua": [
      { code: "EC-2.1", name: "Salón EC-2.1" },
      { code: "EC-2.2", name: "Salón EC-2.2" },
      { code: "EC-2.3", name: "Salón EC-2.3" },
      { code: "EC-2.4", name: "Salón EC-2.4" },
      { code: "EC-3.1", name: "Salón EC-3.1" },
      { code: "EC-3.2", name: "Salón EC-3.2" },
      { code: "EC-3.3", name: "Salón EC-3.3" },
      { code: "EC-3.5", name: "Salón EC-3.5" },
      { code: "EC-A1-A2", name: "Salón EC-A1-A2" }
    ],
    "Almendros": [
      { code: "ALM_3.1", name: "Salón ALM_3.1" },
      { code: "ALM_3.10", name: "Salón ALM_3.10" },
      { code: "ALM_3.11", name: "Salón ALM_3.11" },
      { code: "ALM_3.2", name: "Salón ALM_3.2" },
      { code: "ALM_3.3", name: "Salón ALM_3.3" },
      { code: "ALM_3.4", name: "Salón ALM_3.4" },
      { code: "ALM_3.5", name: "Salón ALM_3.5" },
      { code: "ALM_3.6", name: "Salón ALM_3.6" },
      { code: "ALM_3.7", name: "Salón ALM_3.7" },
      { code: "ALM_3.8", name: "Salón ALM_3.8" },
      { code: "ALM_3.9", name: "Salón ALM_3.9" },
      { code: "ALM-1.1", name: "Salón ALM-1.1" },
      { code: "ALM-1.2", name: "Salón ALM-1.2" },
      { code: "ALM-1.3", name: "Salón ALM-1.3" },
      { code: "ALM-1.4", name: "Salón ALM-1.4" },
      { code: "ALM-1.5", name: "Salón ALM-1.5" },
      { code: "ALM-1.6", name: "Salón ALM-1.6" },
      { code: "ALM-1.7", name: "Salón ALM-1.7" },
      { code: "ALM-1.8", name: "Salón ALM-1.8" },
      { code: "AUD_ALM.", name: "Auditorio Almendros" }
    ],
    "Cedro Rosado": [
      { code: "CR-2.1", name: "Salón CR-2.1" },
      { code: "CR-3.1", name: "Salón CR-3.1" },
      { code: "CR-3.2", name: "Salón CR-3.2" },
      { code: "CR-3.3", name: "Salón CR-3.3" },
      { code: "CR-3.4", name: "Salón CR-3.4" },
      { code: "CR-4.1", name: "Salón CR-4.1" },
      { code: "CR-4.2", name: "Salón CR-4.2" },
      { code: "CR-4.3", name: "Salón CR-4.3" },
      { code: "CR-4.4", name: "Salón CR-4.4" },
      { code: "CR-5.1", name: "Salón CR-5.1" },
      { code: "CR-5.2", name: "Salón CR-5.2" },
      { code: "CR-5.3", name: "Salón CR-5.3" },
      { code: "CR-5.4", name: "Salón CR-5.4" },
      { code: "CR-6.2", name: "Salón CR-6.2" },
      { code: "CR-6.3", name: "Salón CR-6.3" },
      { code: "CR-AU.1", name: "Auditorio Cedro Rosado 1" },
      { code: "CR-AU.2", name: "Auditorio Cedro Rosado 2" },
      { code: "CR-AU.3", name: "Auditorio Cedro Rosado 3" }
    ],
    "Guayacanes": [
      { code: "EG-2.4", name: "Salón EG-2.4" },
      { code: "EG-3.1", name: "Salón EG-3.1" },
      { code: "EG-4.1", name: "Salón EG-4.1" },
      { code: "EG-5.2", name: "Salón EG-5.2" }
    ],
    "Guaduales": [
      { code: "GUADUALES1", name: "Salón GUADUALES1" },
      { code: "GUADUALES2", name: "Salón GUADUALES2" }
    ],
    "Lago": [
      { code: "LG-1.0", name: "Salón LG-1.0" },
      { code: "LG-1.2", name: "Salón LG-1.2" },
      { code: "LG-1.3", name: "Salón LG-1.3" },
      { code: "LG-1.4", name: "Salón LG-1.4" },
      { code: "LG-1.5", name: "Salón LG-1.5" },
      { code: "LG-1.6", name: "Salón LG-1.6" },
      { code: "LG-1.7", name: "Salón LG-1.7" },
      { code: "LG-1.8", name: "Salón LG-1.8" },
      { code: "LG-2.0", name: "Salón LG-2.0" },
      { code: "LG-2.12", name: "Salón LG-2.12" },
      { code: "LG-2.13", name: "Salón LG-2.13" },
      { code: "LG-2.14", name: "Salón LG-2.14" },
      { code: "LG-2.2", name: "Salón LG-2.2" },
      { code: "LG-2.6", name: "Salón LG-2.6" },
      { code: "LG-2.8", name: "Salón LG-2.8" },
      { code: "LG-2.9", name: "Salón LG-2.9" },
      { code: "LG-3.1", name: "Salón LG-3.1" },
      { code: "LG-3.3", name: "Salón LG-3.3" },
      { code: "LG-3.4", name: "Salón LG-3.4" },
      { code: "LG-3.5", name: "Salón LG-3.5" },
      { code: "LG-4.0", name: "Salón LG-4.0" },
      { code: "LG-4.2", name: "Salón LG-4.2" },
      { code: "LG-4.3", name: "Salón LG-4.3" },
      { code: "LG-4.4", name: "Salón LG-4.4" },
      { code: "LG-4.6", name: "Salón LG-4.6" }
    ],
    "Palmas": [
      { code: "PL-1.3", name: "Salón PL-1.3" },
      { code: "PL-1.4", name: "Salón PL-1.4" },
      { code: "PL-1.5", name: "Salón PL-1.5" },
      { code: "PL-1.6", name: "Salón PL-1.6" }
    ],
    "Samán": [
      { code: "SM-1.3", name: "Salón SM-1.3" },
      { code: "SM-1.4", name: "Salón SM-1.4" },
      { code: "SM-1.5", name: "Salón SM-1.5" },
      { code: "SM-1.6", name: "Salón SM-1.6" },
      { code: "SM-1.7", name: "Salón SM-1.7" },
      { code: "SM-1.8", name: "Salón SM-1.8" },
      { code: "SM-1.9", name: "Salón SM-1.9" },
      { code: "SM-2.2", name: "Salón SM-2.2" },
      { code: "SM-2.3", name: "Salón SM-2.3" },
      { code: "SM-2.4", name: "Salón SM-2.4" },
      { code: "SM-2.5", name: "Salón SM-2.5" },
      { code: "SM-2.6", name: "Salón SM-2.6" },
      { code: "SM-2.7", name: "Salón SM-2.7" },
      { code: "SM-2.8", name: "Salón SM-2.8" },
      { code: "SM-2.9", name: "Salón SM-2.9" },
      { code: "SM-2.10", name: "Salón SM-2.10" },
      { code: "SM-2.11", name: "Salón SM-2.11" },
      { code: "SM-2.12", name: "Salón SM-2.12" }
    ]
  };

  const handleContinue = () => {
    if (selectedRoom) {
      navigate(`/salon/${selectedRoom}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-indigo-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-700 mb-4 mt-2">
        Chat con IA
      </h1>

      <div className="w-full max-w-2xl mx-auto bg-white p-4 rounded-xl shadow-xl mb-4">
        <label htmlFor="room" className="block text-lg font-semibold mb-2 text-gray-700">
          Seleccione el salón
        </label>

        <div className="space-y-4">
          {Object.entries(buildings).map(([buildingName, rooms]) => (
            <div key={buildingName} className="border rounded-lg p-3">
              <h3 className="font-semibold text-lg mb-2">{buildingName}</h3>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => setSelectedRoom(e.target.value)}
                value={selectedRoom}
              >
                <option value="">-- Seleccione un salón --</option>
                {rooms.map((room) => (
                  <option key={room.code} value={room.code}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedRoom}
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
        >
          Continuar
        </button>
      </div>

      <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col">
        <div className="flex-1 flex flex-col pb-4">
          <ChatPrompt selectedRoom={selectedRoom} />
        </div>

        <p className="text-center text-purple-600 font-medium text-sm my-2">
          Desarrollado con ❤️ para UNICATOLICA 2025
        </p>
      </div>
    </div>
  );
}

export default App;