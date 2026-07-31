# AI Document Q&A

An AI-powered document question answering application built with **React, TypeScript, Express, MongoDB, and Retrieval-Augmented Generation (RAG)**.

Users can upload documents, search them semantically, ask natural language questions, and receive AI-generated answers with cited source passages.

---

## Demo Mode

The current version uses mocked AI responses for demonstration. Replacing the mock implementation with OpenAI or another LLM provider requires updating only the AI service layer.

---

# Development Notes

The application is designed with modular services so that retrieval, embeddings, analytics, authentication, and document management can evolve independently.

---

# Features

## Authentication

* User registration
* User login
* JWT authentication
* Protected API routes
* User profiles

---

## Document Management

* Upload PDF documents
* Upload DOCX documents
* Upload TXT documents
* Paste text directly
* Multiple document support
* Document ownership
* Delete documents
* Recent documents
* Document statistics

---

## Retrieval-Augmented Generation (RAG)

* Automatic document chunking
* Text embeddings
* In-memory vector database
* Semantic similarity search
* Question answering
* Source citations
* Page references
* Multiple retrieved context chunks

---

## Search

* Search within a document
* Semantic document search
* Global document search
* Ranked search results

---

## Dashboard

Personal dashboard displaying:

* Uploaded documents
* Questions asked
* Total chunks
* Storage usage
* Recent documents
* Activity history
* Usage statistics

---

## Analytics

Tracks:

* Upload count
* Question count
* Storage usage
* User activity
* Document statistics

---

## User Interface

* Responsive design
* Dark mode
* Loading indicators
* Dashboard
* Profile menu
* Document cards
* Search interface

---

# Tech Stack

## Frontend

* React
* TypeScript
* Vite
* Axios
* Tailwind CSS

## Backend

* Node.js
* Express
* TypeScript
* MongoDB
* Mongoose
* JWT Authentication
* Multer

## AI

* OpenAI Embeddings
* Retrieval-Augmented Generation (RAG)

---

# Project Structure

```
client/
    src/
        components/
        context/
        services/
        types/

server/
    src/
        middleware/
        models/
        routes/
        services/
        utils/
```

---

# API Endpoints

## Authentication

```
POST /auth/register
POST /auth/login
```

## Upload

```
POST /upload
```

Upload a document or pasted text.

---

## Questions

```
POST /ask
```

Ask a question about a document.

---

## Documents

```
GET    /documents
GET    /documents/:documentId/search
DELETE /documents/:documentId
```

---

## Dashboard

```
GET /dashboard
```

---

# Installation

## Clone the repository

```bash
git clone https://github.com/yourusername/ai-document-qa.git
```

```bash
cd ai-document-qa
```

---

## Backend

```bash
cd server
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=3001

MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_secret

OPENAI_API_KEY=your_openai_api_key
```

Run the server

```bash
npm run dev
```

---

## Frontend

```bash
cd client
```

Install dependencies

```bash
npm install
```

Create a `.env`

```env
VITE_API_URL=http://localhost:3001
```

Run

```bash
npm run dev
```

---

# RAG Pipeline

```
Upload document
        │
        ▼
Extract text
        │
        ▼
Split into chunks
        │
        ▼
Generate embeddings
        │
        ▼
Store vectors
        │
        ▼
User question
        │
        ▼
Generate question embedding
        │
        ▼
Semantic search
        │
        ▼
Retrieve relevant chunks
        │
        ▼
Generate AI answer
        │
        ▼
Return answer + citations
```

---

## Author

Derek Barus

GitHub: https://github.com/barusdrk
