import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Admin } from './pages/Admin';
import { I18nProvider } from './lib/i18n';
import { SiteDataProvider } from './lib/SiteDataContext';

export default function App() {
  return (
    <I18nProvider>
      <SiteDataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </SiteDataProvider>
    </I18nProvider>
  );
}
