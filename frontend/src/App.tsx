import React from 'react';
import { InsuranceCalculator } from './components/InsuranceCalculator';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <InsuranceCalculator />
      </main>
      <Footer />
    </div>
  );
}

export default App;