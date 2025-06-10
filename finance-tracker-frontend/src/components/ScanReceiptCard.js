import React, { useState } from 'react';

const ScanReceiptCard = ({ onExtractedData }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleExtract = async () => {
    if (!image) return alert("Please upload an image first");

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', image);

      const response = await fetch('http://localhost:5000/api/ocr', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      onExtractedData(data); // 🔁 Send back extracted fields to ExpenseForm
    } catch (err) {
      alert('Failed to extract data from image');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 mb-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">📸 Scan Receipt</h3>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageChange}
        className="mb-3"
      />

      {image && (
        <div className="mb-4">
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-40 h-40 object-cover rounded border"
          />
        </div>
      )}

      <button
        onClick={handleExtract}
        disabled={loading}
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Processing...' : 'Extract Details'}
      </button>
    </div>
  );
};

export default ScanReceiptCard;
