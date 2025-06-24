<div align="center">
  <img src="https://earth.org/wp-content/uploads/2022/03/Untitled-design-2022-03-18T144807.712.jpg" width="120" alt="AgriLink Logo"/>
  
  <h1>🌱 <span style="color:#16a34a">AgriLink</span> — Smart Agricultural Waste Marketplace</h1>
  <h3><em>Empowering Farmers • Fueling Industry • Sustaining the Planet</em></h3>
  <p>
    <img src="https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white"/>
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwindcss&logoColor=white"/>
    <img src="https://img.shields.io/badge/Civic_Auth-0A2540?logo=civic&logoColor=white"/>
    <img src="https://img.shields.io/badge/Gemini_API-4285F4?logo=google&logoColor=white"/>
    <img src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white"/>
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white"/>
    <img src="https://img.shields.io/badge/Aptos-000000?logo=aptos&logoColor=white"/>
    <img src="https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white"/>
  </p>
</div>

---

## 🌟 Overview

AgriLink is a next-generation platform that transforms agricultural waste into valuable resources. By connecting farmers and industries, leveraging AI, blockchain, and modern web technologies, AgriLink creates a transparent, secure, and sustainable marketplace for agricultural byproducts.

---

## 🏗️ Folder Structure

```text
hack4bengal/
│
├── frontend/         # Next.js web app (UI, auth, marketplace, dashboards)
│   ├── app/          # Main app directory (pages, layouts, components)
│   │   ├── actions/  # Server actions (MongoDB, business logic)
│   │   ├── api/      # API routes (auth, Gemini, etc.)
│   │   ├── components/ # Reusable UI components
│   │   ├── ...       # Other feature folders (marketplace, login, etc.)
│   ├── lib/          # Utility libraries (MongoDB connector, user utils)
│   ├── public/       # Static assets and images
│   ├── ...           # Config files, styles, etc.
│
├── backend/          # Python backend (blockchain, token minting, CO₂ tracking)
│   ├── main.py       # Main blockchain logic (Aptos, token minting)
│   ├── account.py    # Account management
│   ├── co2_logic.py  # CO₂ calculation logic
│   ├── ...           # Other backend modules
│
└── README.md         # Project documentation (this file)
```

---

## 🚀 What Does AgriLink Do?

- <b>For Farmers:</b> Instantly list waste, get AI-powered price suggestions, earn new income, and track CO₂ savings.
- <b>For Industry:</b> Discover, filter, and procure verified agricultural waste for sustainable production.
- <b>For the Planet:</b> Reduces open burning, landfill waste, and tracks environmental impact in real time.

---

## 🧑‍💻 Tech Stack & Tools

### <img src="https://img.shields.io/badge/Frontend-38B2AC?style=flat-square&logo=react&logoColor=white"/> Frontend
- <img src="https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white"/> **Next.js** — Modern React framework
- <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwindcss&logoColor=white"/> **Tailwind CSS** — Utility-first styling
- <img src="https://img.shields.io/badge/Civic_Auth-0A2540?logo=civic&logoColor=white"/> **Civic Auth** — Decentralized authentication
- <img src="https://img.shields.io/badge/Gemini_API-4285F4?logo=google&logoColor=white"/> **Gemini API** — AI waste recognition & pricing
- <img src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white"/> **MongoDB** — NoSQL database
- <img src="https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white"/> **Supabase Storage** — Image uploads
- <img src="https://img.shields.io/badge/Lucide_React-000?logo=lucide&logoColor=white"/> **Lucide React** — Icon library
- <img src="https://img.shields.io/badge/AOS-000?logo=aos&logoColor=white"/> **AOS** — Animate On Scroll

### <img src="https://img.shields.io/badge/Backend-3776AB?style=flat-square&logo=python&logoColor=white"/> Backend
- <img src="https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white"/> **Python 3.12+**
- <img src="https://img.shields.io/badge/Aptos-000000?logo=aptos&logoColor=white"/> **Aptos SDK** — Blockchain, token minting
- <img src="https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white"/> **FastAPI** (if used) — API framework
- <img src="https://img.shields.io/badge/dotenv-000?logo=python-dotenv&logoColor=white"/> **dotenv** — Env management

---

## 🔗 How It All Works

### Frontend
- Handles all user interactions, authentication, and UI rendering
- Civic Auth for secure login/session
- Gemini API for AI-based waste recognition and price estimation
- MongoDB for live data (listings, portfolios, carbon wallet)
- Supabase for image uploads
- Dashboards for earnings, listings, and environmental impact
- Mobile-first, beautiful, and accessible UI

### Backend
- Blockchain operations (Aptos): minting carbon tokens, tracking transactions
- Secure storage/retrieval of sensitive data
- Endpoints for frontend to interact with blockchain and database
- CO₂ savings and token rewards calculation

---

## ⚙️ Main Features
- 🔒 Secure, decentralized login (Civic Auth)
- 🤖 AI-powered waste classification & smart pricing (Gemini API)
- 📊 Real-time data for listings, portfolios, carbon wallet (MongoDB)
- ⛓️ Blockchain-based carbon token minting & transaction tracking (Aptos)
- 🏪 Marketplace for listing, discovering, and transacting agricultural waste
- 🌱 Environmental impact tracking & reporting
- 📱 Mobile-responsive, modern UI/UX

---

## 📦 Getting Started

### Frontend
```bash
cd frontend
npm install # or yarn install
# Set up .env.local with API keys and MongoDB URI
npm run dev
# Open http://localhost:3000
```

### Backend
```bash
cd backend
pip install -r requirements.txt
# Set up .env with Aptos private keys and config
python main.py
```

---

## 📁 Example Directory Structure

```text
hack4bengal/
├── frontend/
│   ├── app/
│   │   ├── actions/
│   │   ├── api/
│   │   ├── components/
│   │   ├── ...
│   ├── lib/
│   ├── public/
│   ├── ...
├── backend/
│   ├── main.py
│   ├── account.py
│   ├── co2_logic.py
│   ├── ...
└── README.md
```

---

## 📚 Learn More
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Civic Auth](https://www.civic.com/)
- [Aptos Blockchain](https://aptosfoundation.org/)
- [Gemini API](https://ai.google.dev/gemini-api/docs)
- [MongoDB](https://www.mongodb.com/)
- [Supabase](https://supabase.com/)

---

<div align="center">
  <b>AgriLink: From Waste to Wealth — Empowering Farmers, Fueling Industry, Sustaining the Planet.</b>
</div>