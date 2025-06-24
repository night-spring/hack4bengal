# AgriLink Frontend

**Transforming Agricultural Waste into Wealth**

AgriLink is an AI-powered, blockchain-integrated marketplace that connects farmers with industrial buyers, enabling the monetization of agricultural waste and promoting sustainable, circular economies. This frontend, built with Next.js and Tailwind CSS, delivers a seamless, secure, and mobile-friendly user experience for all stakeholders.

---

## ✨ Key Features

- **Civic Auth Integration:**
  - Secure, decentralized login and session management using Civic Auth.
  - Route protection and user authentication for all sensitive pages.

- **AI-Powered Waste Recognition & Smart Pricing:**
  - Instantly classify waste and estimate value using Gemini API.
  - Real-time, data-driven price suggestions based on market demand, quality, and location.

- **Live Portfolio & Carbon Wallet:**
  - View and manage all your waste listings, transactions, and carbon token balances.
  - Real-time data fetched from MongoDB, with fallback to mock data for reliability.

- **Marketplace & Industry Network:**
  - List agricultural waste with images and details.
  - Receive and compare offers from 500+ verified industrial buyers.

- **Sustainability & Impact Tracking:**
  - Track CO₂ reduction, waste diverted, and earnings in real time.
  - Visual dashboards and stats for both farmers and buyers.

- **Mobile-First, Modern UI/UX:**
  - Fully responsive design with beautiful animations and professional layouts.
  - Accessible, intuitive navigation for all user types.

- **Secure & Scalable:**
  - All user and listing data securely stored in MongoDB.
  - Session and authentication logic ensures privacy and data integrity.

---

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
yarn install
   ```
2. **Set up environment variables:**
   - Create a `.env.local` file in the `frontend` directory with your API keys and MongoDB connection string.
3. **Run the development server:**
   ```bash
   npm run dev
   # or
yarn dev
   ```
4. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## 🛠️ Project Structure

- `app/` — Main Next.js app directory (pages, layouts, components)
- `app/components/` — Reusable UI components (Navbar, Hero, etc.)
- `app/actions/` — Server actions for MongoDB and business logic
- `app/api/` — API routes for authentication, Gemini, and more
- `lib/` — Utility libraries (MongoDB connector, user utilities)
- `public/` — Static assets and images

---

## 🔒 Authentication & Security
- Civic Auth for decentralized, privacy-preserving login
- Custom JWT/session handler for secure user sessions
- Route protection middleware for all key pages

## 🤖 AI & Data
- Gemini API for smart, real-time price estimation
- MongoDB for all user, listing, and transaction data
- Live portfolio and carbon wallet with fallback to mock data

## 🌱 Sustainability Impact
- Track CO₂ savings and waste monetized
- Empower farmers to earn from waste, reduce open burning, and support industry sustainability

---

## 📦 Deployment

Deploy easily on [Vercel](https://vercel.com/) or your preferred platform. See Next.js docs for more details.

---

## 📚 Learn More
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Civic Auth](https://www.civic.com/)
- [Aptos Blockchain](https://aptosfoundation.org/)
- [Gemini API](https://ai.google.dev/gemini-api/docs)

---

> **AgriLink: From Waste to Wealth — Empowering Farmers, Fueling Industry, Sustaining the Planet.**
