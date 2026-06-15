# 🏥 Modern Healthcare Dashboard

A fully responsive, dynamic healthcare dashboard application built with **Next.js** and **React**. This project was developed to showcase modern front-end development skills, focusing on pixel-perfect design implementation, complex data visualization, and seamless API integrations.

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)

## ✨ Features

- **Pixel-Perfect UI:** Meticulously crafted from an Adobe XD design template using vanilla CSS to ensure absolute control over layout, typography, and theming.
- **Dynamic Data Visualization:** Integrates **Chart.js (`react-chartjs-2`)** to map complex chronological patient data (systolic & diastolic blood pressure) onto a smooth, interactive line graph.
- **Live API Integration:** Features a robust data-fetching layer that pulls live health records and parses complex nested JSON structures. 
- **State Management & Filtering:** Efficiently processes payload data to map specific diagnostic histories, lab results, and patient vitals to their respective UI components.
- **Responsive Architecture:** Utilizes modern CSS Grid and Flexbox to ensure the dashboard seamlessly collapses into mobile-friendly views without breaking data legibility.
- **Secure Authentication:** Implements Base64 encoded Basic Authentication handling for secure data retrieval directly from the frontend.

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Library:** React 18
- **Styling:** Vanilla CSS (CSS Variables, Flexbox, CSS Grid)
- **Data Visualization:** Chart.js
- **Icons:** Lucide React

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) installed.

### Installation

1. Clone the repository
2. Install the dependencies:
```bash
npm install
```
3. Run the development server:
```bash
npm run dev
```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Static Export
This project is configured for static site generation. You can compile it into a fully static HTML site by running:
```bash
npm run build
```
The output will be available in the `out/` directory, ready to be deployed to static hosting providers like GitHub Pages, Vercel, or Netlify.

## 🧠 What I Learned & Highlighted Skills

Building this dashboard allowed me to demonstrate a variety of essential front-end engineering skills:

- **Translating Design to Code:** Moving from a static design file to a scalable component architecture without relying on heavy CSS frameworks.
- **Handling Complex Component States:** Managing asynchronous data fetching, loading states, and ensuring that child components only render once the API payload is validated and parsed.
- **Data Structure Manipulation:** Taking large nested arrays of historical data and normalizing them to feed cleanly into charting libraries.

---

*If you're a recruiter or hiring manager looking for a detail-oriented front-end developer who cares about UI/UX and clean code architecture, I'd love to connect!*
