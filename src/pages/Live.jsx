import { useState, useEffect } from 'react';

// Simulación de datos de videos para el ejemplo
const mockVideos = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  src: "https://docs.material-tailwind.com/demo.mp4",
  description: `Camara ${index + 1}`,
}));

export default function Live({ searchQuery, darkMode = false }) {
  // Estado para almacenar la lista de videos
  const [videos, setVideos] = useState([]);
  // Estado para almacenar el video seleccionado
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Efecto para simular la solicitud al backend y establecer los videos
  useEffect(() => {
    setVideos(mockVideos);
  }, []);

  // Función para manejar la selección de un video
  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  // Función para manejar el regreso a la vista de lista de videos
  const handleBackClick = () => {
    setSelectedVideo(null);
  };

  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-100 text-gray-900'}`}>
      {selectedVideo ? (
        // Vista de video seleccionado
        <div>
          <button
            onClick={handleBackClick}
            className={`mb-4 px-4 py-2 rounded ${
              darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Volver
          </button>
          <video className="h-full w-full rounded-lg shadow-lg" controls autoPlay>
            <source src={selectedVideo.src} type="video/mp4" />
          </video>
          <p className="mt-4 text-center text-lg font-semibold">{selectedVideo.description}</p>
        </div>
      ) : (
        // Vista de lista de videos
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className={`glass-card rounded-lg shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg cursor-pointer ${
                darkMode ? 'bg-slate-800' : 'bg-slate-100'
              }`}
              onClick={() => handleVideoClick(video)}
            >
              <video className="h-40 w-full object-cover rounded-t-lg" controls muted>
                <source src={video.src} type="video/mp4" />
              </video>
              <div className="p-2">
                <p className={`text-center text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
