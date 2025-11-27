'use client';

import { useState } from 'react';

export default function PlayGround() {
  const [result, setResult] = useState(null); // Changed to null for object
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    // Convert file to base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      try {
        const response = await fetch('/api/cod/openai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: base64Image,
            prompt: 'Extract all player statistics from this image and return as a JSON object with a "players" array. Each player object must include: name, kills, deaths.',
          }),
        });

        const data = await response.json();
        
        // Handle errors
        if (data.error) {
          console.error('Error:', data.error);
          setResult({ error: data.error });
          return;
        }
        
        // data is now the parsed JSON object with { players: [...] }
        console.log('Parsed data:', data);
        setResult(data);
      } catch (error) {
        console.error('Error:', error);
        setResult({ error: error.message });
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4">
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange}
        className="mb-4"
      />
      {loading && <p>Analyzing...</p>}
      {result && result.error && (
        <p className="text-red-500">Error: {result.error}</p>
      )}
      {result && result.players && (
        <div>
          <h2 className="text-xl font-bold mb-4">Player Stats:</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(result, null, 2)}
          </pre>
          
          {/* Or display as a table */}
          <table className="mt-4 border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Kills</th>
                <th className="border p-2">Deaths</th>
              </tr>
            </thead>
            <tbody>
              {result.players.map((player, index) => (
                <tr key={index}>
                  <td className="border p-2">{player.name}</td>
                  <td className="border p-2">{player.kills}</td>
                  <td className="border p-2">{player.deaths}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}