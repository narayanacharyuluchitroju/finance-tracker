# 💸 Finance Tracker App

A full-stack personal finance tracking application that allows users to manage their expenses efficiently. Users can register/login, categorize their expenses, and visualize their spending. Built with **React.js** frontend and **Node.js + Express.js** backend, with MongoDB as the database. Also includes OCR-powered receipt scanning.

---

## 🚀 Features

- 🔐 User Authentication (Register & Login)
- 🧾 Add, Update, and Delete Expenses
- 📊 Category-wise and Total Expense Tracking
- 📷 Upload or Capture Receipts with OCR
- ☁️ Real-time Code Analysis via SonarCloud
- 🗃️ MongoDB for persistent storage

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- OpenAI API (OCR + NLP for Expense Extraction)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for Authentication
- Multer for File Uploads

### DevOps & CI/CD
- Docker & Docker Compose
- GitHub Actions
- SonarCloud Integration

---

## 📸 Screenshots

| Login Page | Register Page | Dashboard |
|------------|---------------|-----------|
| ![Login](./assets/login.png) | ![Register](./assets/register.png) | ![Dashboard](./assets/dashboard.png) |

> Make sure to place these images inside an `assets` folder in the root directory.

---

## 🧠 OCR Integration

Users can upload or capture an image of a bill. The backend sends the image to OpenAI’s API, which returns structured fields:

- 💲 Amount
- 🏷️ Category
- 📝 Description
- 💳 Payment Type
- 📅 Date

These details are auto-filled and can be manually edited before saving.

---

## 🧪 SonarCloud Integration

SonarCloud is used for static code analysis and test coverage reporting. View the project here:

🔗 [SonarCloud Project Dashboard](https://sonarcloud.io/project/overview?id=narayanacharyuluchitroju_finance-tracker)

---

## 🧭 Project Structure

