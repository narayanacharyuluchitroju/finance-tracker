// src/controllers/ocrController.js
const fs = require('fs');
const axios = require('axios');

const extractExpenseFromImage = async (req, res) => {
  try {
    const imageBuffer = fs.readFileSync(req.file.path);
    const base64Image = imageBuffer.toString('base64');

    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'llava',
      prompt: `Extract the following details from this receipt image:
      - Amount
      - Category
      - Description
      - Payment Type (Cash, Card, UPI, etc.)
      - Date
      
      Return the result in strict JSON format like:
      {
        "amount": 123.45,
        "category": "Grocery",
        "description": "Reliance Fresh",
        "paymentType": "Card",
        "date": "2025-06-08"
      }`,
      images: [base64Image],
      stream: false
    });

    console.log('\n🟢 LLM Raw Response:\n', response.data.response); // 👈 print raw text

    // Extract JSON from text (assumes LLM might wrap it in extra text)
    const jsonMatch = response.data.response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.warn('⚠️ No JSON structure found in LLM response');
      return res.status(400).json({ error: 'Could not extract structured data' });
    }

    const extracted = JSON.parse(jsonMatch[0]);
    console.log('\n✅ Extracted Expense Data:\n', extracted);

    res.json(extracted);
  } catch (err) {
    console.error('\n❌ OCR Error:', err.message || err);
    res.status(500).json({ error: 'Failed to extract data from image' });
  }
};

module.exports = { extractExpenseFromImage };
