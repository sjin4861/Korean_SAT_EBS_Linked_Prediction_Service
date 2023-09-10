'use client'

import React, { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [questionCount, setQuestionCount] = useState(1);

  const generatePrompt = async () => {
    // 사용자 입력을 기반으로 GPT에 전달하는 코드
    // (예: axios 또는 fetch를 사용하여 API 호출)
    const response = await fetch('/api/generatePrompt', {
      method: 'POST',
      body: JSON.stringify({ topic, questionCount }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const result = await response.json();
    
    console.log(result)
    // 결과 처리 코드 (지문 출력 또는 다운로드 링크 생성)
  };

  return (
    <div>
      <h1>수능 국어 지문 생성 서비스</h1>
      <label>주제: <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} /></label><br />
      <label>문항 수: <input type="number" value={questionCount} onChange={(e) => setQuestionCount(e.target.value)} /></label><br />
      <button onClick={generatePrompt}>지문 생성</button>
    </div>
  );
}
