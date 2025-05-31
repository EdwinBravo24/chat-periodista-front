import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function SalonInfo() {
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const roomImages = {
    // Educación Continua
    "EC-2.1": "https://www.yarquitectura.com/wp-content/uploads/2023/06/auditorios-arquitectura.jpg",
    "EC-2.2": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-3.5.jpg",
    "EC-2.3": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-+3.3.jpg",
    "EC-2.4": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-3.5.jpg",
    "EC-3.1": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-+3.3.jpg",
    "EC-3.2": "https://www.yarquitectura.com/wp-content/uploads/2023/06/auditorios-arquitectura.jpg",
    "EC-3.3": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-+3.3.jpg",
    "EC-3.5": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-3.5.jpg",
    "EC-A1-A2": "https://www.yarquitectura.com/wp-content/uploads/2023/06/auditorios-arquitectura.jpg",

    // Almendros
    "ALM_3.1": "https://www.yarquitectura.com/wp-content/uploads/2023/06/auditorios-arquitectura.jpg",
    "ALM_3.10": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-3.5.jpg",
    "ALM_3.11": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Almendros/3.11.jpg",
    "ALM_3.2": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Almendros/3.2.jpg",
    "ALM_3.3": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Almendros/3.3.jpg",
    "ALM_3.4": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Almendros/3.4.jpg",
    "ALM_3.5": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-+3.3.jpg",
    "ALM_3.6": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Almendros/3.2.jpg",
    "ALM_3.7": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Almendros/3.5.jpg",
    "ALM_3.8": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Almendros/3.8.jpg",
    "ALM_3.9": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-3.5.jpg",
    "ALM-1.1": "https://www.yarquitectura.com/wp-content/uploads/2023/06/auditorios-arquitectura.jpg",
    "ALM-1.2": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-+3.3.jpg",
    "ALM-1.3": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-3.5.jpg",
    "ALM-1.4": "https://www.yarquitectura.com/wp-content/uploads/2023/06/auditorios-arquitectura.jpg",
    "ALM-1.5": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-+3.3.jpg",
    "ALM-1.6": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Almendros/1.6.jpg",
    "ALM-1.7": "https://www.yarquitectura.com/wp-content/uploads/2023/06/auditorios-arquitectura.jpg",
    "ALM-1.8": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-+3.3.jpg",
    "AUD_ALM.": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-3.5.jpg",

    // Cedro Rosado
    "CR-2.1": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Cedro+rosado/CR+3.1+-+2.jpg",
    "CR-3.1": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Cedro+rosado/CR+3.1.jpg",
    "CR-3.2": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-3.5.jpg",
    "CR-3.3": "https://www.yarquitectura.com/wp-content/uploads/2023/06/auditorios-arquitectura.jpg",
    "CR-3.4": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-+3.3.jpg",
    "CR-4.1": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-3.5.jpg",
    "CR-4.2": "https://www.yarquitectura.com/wp-content/uploads/2023/06/auditorios-arquitectura.jpg",
    "CR-4.3": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-+3.3.jpg",
    "CR-4.4": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-3.5.jpg",
    "CR-5.1": "https://www.yarquitectura.com/wp-content/uploads/2023/06/auditorios-arquitectura.jpg",
    "CR-5.2": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Cedro+rosado/CR+5.3+-+2.jpg",
    "CR-5.3": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Cedro+rosado/CR+5.3.jpg",
    "CR-5.4": "https://www.yarquitectura.com/wp-content/uploads/2023/06/auditorios-arquitectura.jpg",
    "CR-6.2": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Cedro+rosado/Cr+6.2.jpg",
    "CR-6.3": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Cedro+rosado/Cr+6.3.jpg",
    "CR-AU.1": "https://www.yarquitectura.com/wp-content/uploads/2023/06/auditorios-arquitectura.jpg",
    "CR-AU.2": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Cedro+rosado/CR+Aud+2.jpg",
    "CR-AU.3": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Cedro+rosado/CR+Aud+3.jpg",

    // Guayacanes
    "EG-2.4": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Guadual-Guayacanes-Palmas/EG+3.1.jpg",
    "EG-3.1": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Guadual-Guayacanes-Palmas/EG+3.1.jpg",
    "EG-4.1": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Guadual-Guayacanes-Palmas/EG+4.1.jpg",
    "EG-5.2": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Guadual-Guayacanes-Palmas/EG+5.2.jpg",

    // Guaduales
    "GUADUALES1": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Guadual-Guayacanes-Palmas/Guaduales+2.jpg",
    "GUADUALES2": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Guadual-Guayacanes-Palmas/Guaduales+2.jpg",

    // Lago
    "LG-1.0": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Lagos/LG+0.3.jpg",
    "LG-1.2": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Lagos/LG+1.1.jpg",
    "LG-1.3": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-3.5.jpg",
    "LG-1.4": "https://www.yarquitectura.com/wp-content/uploads/2023/06/auditorios-arquitectura.jpg",
    "LG-1.5": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-+3.3.jpg",
    "LG-1.6": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-3.5.jpg",
    "LG-1.7": "https://www.yarquitectura.com/wp-content/uploads/2023/06/auditorios-arquitectura.jpg",
    "LG-1.8": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-+3.3.jpg",
    "LG-2.0": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Lagos/LG+2.3.jpg",
    "LG-2.12": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Lagos/LG+2.1.jpg",
    "LG-2.13": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Lagos/LG+2.4.jpg",
    "LG-2.14": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Lagos/LG+2.6.jpg",
    "LG-2.2": "https://www.yarquitectura.com/wp-content/uploads/2023/06/auditorios-arquitectura.jpg",
    "LG-2.6": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Lagos/LG+2.7.jpg",
    "LG-2.8": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Lagos/LG+2.10.jpg",
    "LG-2.9": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Lagos/LG+2.11.jpg",
    "LG-3.1": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-+3.3.jpg",
    "LG-3.3": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-3.5.jpg",
    "LG-3.4": "https://www.yarquitectura.com/wp-content/uploads/2023/06/auditorios-arquitectura.jpg",
    "LG-3.5": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-+3.3.jpg",
    "LG-4.0": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-3.5.jpg",
    "LG-4.2": "https://www.yarquitectura.com/wp-content/uploads/2023/06/auditorios-arquitectura.jpg",
    "LG-4.3": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-+3.3.jpg",
    "LG-4.4": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-3.5.jpg",
    "LG-4.6": "https://www.yarquitectura.com/wp-content/uploads/2023/06/auditorios-arquitectura.jpg",

    // Palmas
    "PL-1.3": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Guadual-Guayacanes-Palmas/PL-+S.3.JPG",
    "PL-1.4": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Guadual-Guayacanes-Palmas/PL-+S.4.png",
    "PL-1.5": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Guadual-Guayacanes-Palmas/PL-+S.5.JPG",
    "PL-1.6": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/Guadual-Guayacanes-Palmas/PL-+S.6.JPG",

    // Samán
    "SM-1.3": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-3.5.jpg",
    "SM-1.4": "https://www.yarquitectura.com/wp-content/uploads/2023/06/auditorios-arquitectura.jpg",
    "SM-1.5": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-+3.3.jpg",
    "SM-1.6": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-3.5.jpg",
    "SM-1.7": "https://www.yarquitectura.com/wp-content/uploads/2023/06/auditorios-arquitectura.jpg",
    "SM-1.8": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-+3.3.jpg",
    "SM-1.9": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-3.5.jpg",
    "SM-2.2": "https://www.yarquitectura.com/wp-content/uploads/2023/06/auditorios-arquitectura.jpg",
    "SM-2.3": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-+3.3.jpg",
    "SM-2.4": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-3.5.jpg",
    "SM-2.5": "https://www.yarquitectura.com/wp-content/uploads/2023/06/auditorios-arquitectura.jpg",
    "SM-2.6": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-+3.3.jpg",
    "SM-2.7": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-3.5.jpg",
    "SM-2.8": "https://www.yarquitectura.com/wp-content/uploads/2023/06/auditorios-arquitectura.jpg",
    "SM-2.9": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-+3.3.jpg",
    "SM-2.10": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-3.5.jpg",
    "SM-2.11": "https://www.yarquitectura.com/wp-content/uploads/2023/06/auditorios-arquitectura.jpg",
    "SM-2.12": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-+3.3.jpg"
  };

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(`https://chatgpt-backend-tan.vercel.app/api/auditoriums/code/${roomId}`);
        setRoomData(response.data);
      } catch (err) {
        setError('Error al cargar los datos del salón');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [roomId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Cargando información del salón...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Información del Salón {roomData?.code}</h2>

        <img
          src={roomImages[roomId] || 'https://via.placeholder.com/300'}
          alt={`Imagen del salón ${roomData?.code}`}
          className="rounded shadow-md max-h-64 object-contain mx-auto mb-4"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">Información General</h3>
            <p><strong>Nombre:</strong> {roomData?.name}</p>
            <p><strong>Piso:</strong> {roomData?.floor}</p>
            <p><strong>Capacidad:</strong> {roomData?.capacity}</p>
            <p><strong>Asientos contados:</strong> {roomData?.countedSeats}</p>
            <p><strong>Estado:</strong> {roomData?.status}</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Características</h3>
            <p><strong>Tipo:</strong> {roomData?.type}</p>
            <p><strong>Mesas:</strong> {roomData?.tableType}</p>
            <p><strong>Sillas:</strong> {roomData?.chairType}</p>
            <p><strong>Pizarra:</strong> {roomData?.boardType}</p>
            <p><strong>Equipamiento:</strong> {roomData?.equipment}</p>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold text-lg mb-2">Contacto para reservas</h3>
          <p>{roomData?.reservationContact}</p>
        </div>

        {roomData?.comments && (
          <div className="mt-4 p-3 bg-yellow-50 rounded">
            <h3 className="font-semibold text-lg mb-1">Comentarios</h3>
            <p>{roomData?.comments}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SalonInfo;