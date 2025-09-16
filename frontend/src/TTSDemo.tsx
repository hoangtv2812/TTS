import React, { useState } from 'react';

const TTSDemo: React.FC = () => {
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('alloy');
  const charLimit = 300;

  const voices = [
    { id: 'alloy', name: 'Alloy' },
    { id: 'echo', name: 'Echo' },
    { id: 'fable', name: 'Fable' },
  ];

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleVoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVoice(event.target.value);
  };

  const handleRead = () => {
    console.log('Reading text:', text, 'with voice:', selectedVoice);
    alert(`Đọc với giọng: ${selectedVoice}. Chức năng sẽ được triển khai sau.`);
  };

  const handleDownload = () => {
    console.log('Downloading audio for:', text, 'with voice:', selectedVoice);
    alert(`Tải xuống với giọng: ${selectedVoice}. Chức năng sẽ được triển khai sau.`);
  };

  const isTextValid = text.length > 0 && text.length <= charLimit;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
              Text-to-Speech
            </h1>

            <div className="mb-4">
              <textarea
                className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 dark:text-gray-100 transition duration-200"
                rows={6}
                value={text}
                onChange={handleTextChange}
                maxLength={charLimit}
                placeholder="Nhập văn bản cần chuyển thành giọng nói"
              />
              <div className="flex justify-end mt-2">
                <small className={`text-sm ${text.length > charLimit ? "text-red-500" : "text-gray-500 dark:text-gray-400"}`}>
                  {text.length} / {charLimit}
                </small>
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="voice-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Chọn giọng đọc
              </label>
              <select
                id="voice-select"
                className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 dark:text-gray-100 transition duration-200"
                value={selectedVoice}
                onChange={handleVoiceChange}
              >
                {voices.map((voice) => (
                  <option key={voice.id} value={voice.id}>
                    {voice.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-5">
              <button
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                onClick={handleRead}
                disabled={!isTextValid}
              >
                Phát
              </button>
              <button
                className="w-full sm:w-auto px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                onClick={handleDownload}
                disabled={!isTextValid}
              >
                Tải xuống
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TTSDemo;
