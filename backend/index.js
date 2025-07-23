require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const File = require('./models/File');
const app = express();
const port = 5000;

const openaiApiKey = process.env.OPENAI_API_KEY;

// ✅ MongoDB connection
mongoose.connect('mongodb+srv://vaishnavichopade2004:vaivi1977@cluster0.ybffv.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected ✅'))
  .catch(err => console.error('MongoDB connection error:', err));

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Multer file storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// ✅ Test route
app.get('/', (req, res) => {
  res.send('AnalyzrX backend is running ✅');
});

// ✅ File Upload route
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    const headers = jsonData[0];
    const rows = jsonData.slice(1);

    // Save metadata to MongoDB
    await File.create({ fileName: req.file.originalname });

    res.status(200).json({ headers, rows });
  } catch (error) {
    console.error('Upload error:', error.message);
    res.status(500).json({ error: 'Failed to process the Excel file.' });
  }
});

// ✅ Upload History route
app.get('/history', async (req, res) => {
  try {
    const history = await File.find().sort({ uploadDate: -1 });
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// ✅ AI Summary Generation route
app.post('/generate-summary', async (req, res) => {
  try {
    const { data } = req.body;

    if (!data || data.length === 0) {
      return res.status(400).json({ error: 'No data provided for summary' });
    }

    const previewData = data.slice(0, 10); // Reduce payload

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Give a concise, 4-5 line summary of this tabular data for a dashboard:\n\n${JSON.stringify(previewData)}`,
          },
        ],
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({ error: `OpenAI API error: ${errorText}` });
    }

    const result = await response.json();

    if (result.choices && result.choices[0]) {
      const summary = result.choices[0].message.content;
      res.status(200).json({ summary });
    } else {
      console.error('AI did not return a summary:', result);
      res.status(500).json({ error: 'AI did not return a summary' });
    }
  } catch (err) {
    console.error('AI Summary generation error:', err);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
});


// ✅ Start server
app.listen(port, () => {
  console.log(`AnalyzrX backend running at http://localhost:${port}`);
});
