// pages/api/downloadPrompt.js

import fs from 'fs';

export default function handler(req, res) {
  const filePath = 'generated_prompt.txt';
  
  try {
    // 파일을 읽어 클라이언트로 전송
    const file = fs.readFileSync(filePath, 'utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=generated_prompt.txt');
    res.status(200).end(file);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '파일 다운로드 중 오류가 발생했습니다.' });
  }
}
