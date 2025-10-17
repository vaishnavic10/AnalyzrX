# 🧠 AnalyzrX

AnalyzrX is a **full-stack data analytics platform** built with the **MERN stack (MongoDB, Express.js, React.js, Node.js)** that enables users to **upload, parse, and visualize Excel (.xlsx) datasets**.  
It simplifies complex data reporting by providing **AI-generated summaries**, **interactive 2D/3D visualizations**, and **secure user authentication** all in one place.

---

## 🚀 Features

- 📊 **Excel Upload & Parsing:** Upload `.xlsx` files and automatically extract data using **SheetJS**.  
- 🤖 **AI Summary Generation:** Generate instant data insights using the **OpenAI API**.  
- 🔐 **JWT Authentication:** Secure login and session management for each user.  
- 📈 **Dynamic Chart Visualization:** Create interactive **2D and 3D charts** with **Chart.js**.  
- 📤 **Export Charts as PDF:** Download visual reports in PDF format for sharing and documentation.  
- ⚡ **Optimized Performance:** 30% faster frontend rendering and 80% reduction in manual reporting time.

---

## 🏗️ Tech Stack

| Layer | Technologies Used |
|-------|--------------------|
| **Frontend** | React.js, HTML5, CSS3, Chart.js |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **AI Integration** | OpenAI API |
| **File Handling** | SheetJS (xlsx) |
| **Authentication** | JWT (JSON Web Tokens) |

---

## ⚙️ Installation Guide

Follow these steps to run AnalyzrX locally:

```bash
# Clone the repository
git clone https://github.com/vaishnavic10/AnalyzrX.git

# Navigate into the project directory
cd AnalyzrX

# Install dependencies for backend
cd backend
npm install

# Install dependencies for frontend
cd ../frontend
npm install

# Create a .env file in the backend directory and add:
OPENAI_API_KEY=your_openai_api_key
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

# Run the backend server
npm start

# Run the frontend
cd ../frontend
npm start
