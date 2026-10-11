import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Admin } from './pages/Admin';
import { PDFView } from './pages/PDFView';
import { I18nProvider } from './lib/i18n';
import { SiteDataProvider } from './lib/SiteDataContext';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <I18nProvider>
        <SiteDataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/pdf" element={<PDFView />} />
          </Routes>
        </BrowserRouter>
      </SiteDataProvider>
    </I18nProvider>
  </ErrorBoundary>
  );
}
