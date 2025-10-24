import React, { useState } from 'react';
import _axios from './helpers/axiosHelpers';

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

  const handleRead = async () => {
    console.log('Reading text:', text, 'with voice:', selectedVoice);
    try {
      const response = await _axios({
        method: 'post',
        url: '/api/v1/synthesize',
        body: {
          text,
          voice: selectedVoice,
        },
      });
      console.log('Backend response:', response.data);
      alert(`Đọc với giọng: ${selectedVoice}. Backend đã nhận được yêu cầu.`);
    } catch (error) {
      console.error('Error calling backend:', error);
      alert('Có lỗi xảy ra khi gọi backend.');
    }
  };

  const handleDownload = () => {
    console.log('Downloading audio for:', text, 'with voice:', selectedVoice);
    alert(`Tải xuống với giọng: ${selectedVoice}. Chức năng sẽ được triển khai sau.`);
  };

  const isTextValid = text.length > 0 && text.length <= charLimit;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-md">
        <div className="py-4 px-8 sm:px-12 lg:px-16 flex items-center">
          <svg className="h-8 w-8 text-blue-600 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8v8m4-10v12m4-14v16m4-12v8m4-6v4" />
          </svg>
          <h1 className="text-3xl font-bold text-gray-900">TTS Playground</h1>
        </div>
      </header>

      <main className="flex-grow p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start px-8 sm:px-12 lg:px-16">
          {/* Left Column: TTS Controls */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
                Text-to-Speech
              </h1>

              <div className="mb-4">
                <textarea
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 transition duration-200"
                  rows={6}
                  value={text}
                  onChange={handleTextChange}
                  maxLength={charLimit}
                  placeholder="Nhập văn bản cần chuyển thành giọng nói"
                />
                <div className="flex justify-end mt-2">
                  <small className={`text-sm ${text.length > charLimit ? "text-red-500" : "text-gray-500"}`}>
                    {text.length} / {charLimit}
                  </small>
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="voice-select" className="block text -sm font-medium text-gray-700 mb-2">
                  Chọn giọng đọc:
                </label>
                <select
                  id="voice-select"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 transition duration-200"
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
                  className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                  onClick={handleRead}
                  disabled={!isTextValid}
                >
                  <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Phát
                </button>
                <button
                  className="w-full sm:w-auto px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                  onClick={handleDownload}
                  disabled={!isTextValid}
                >
                  <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Tải xuống
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Information */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Giới thiệu</h2>
              <p className="text-gray-600 mb-4">
                Đây là một giao diện thử nghiệm cho chức năng chuyển văn bản thành giọng nói (Text-to-Speech). Bạn có thể nhập một đoạn văn bản, chọn một trong các giọng đọc có sẵn và nghe kết quả.
              </p>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Các giọng đọc</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li><span className="font-semibold">Alloy:</span> Một giọng đọc nam tính, trầm ấm.</li>
                <li><span className="font-semibold">Echo:</span> Một giọng đọc nữ tính, trong trẻo.</li>
                <li><span className="font-semibold">Fable:</span> Một giọng đọc kể chuyện, truyền cảm.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white w-full">
        <div className="py-4 px-8 sm:px-12 lg:px-16">
          <p className="text-center text-gray-500 text-sm">
            © 2025 TTS Playground. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TTSDemo;
