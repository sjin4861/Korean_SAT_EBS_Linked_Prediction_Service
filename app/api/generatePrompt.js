import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

import fs from 'fs';



export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { topic, questionCount } = req.body;
    
    try {
      // GPT 모델을 사용하여 지문 생성
      const 지문 = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "system",
            "content": "When you get a topic input from a user, please create a text like a non-literary text in the Korean language section of the CSAT. Please make it about 6 paragraphs in total.",
            "role": "user",
            "content": {topic}
          }
        ],
        temperature: 1,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      fs.writeFileSync('generated_prompt.txt', 지문);

      // 생성된 지문을 클라이언트에 전송
      res.status(200).json({ 지문 });
      res.status(200).json({ downloadLink: '/api/downloadPrompt' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '지문 생성 중 오류가 발생했습니다.' });
    }
  } else {
    res.status(405).json({ error: 'POST 메서드만 허용됩니다.' });
  }
}
