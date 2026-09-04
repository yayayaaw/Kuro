import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { MenuSection } from './components/MenuSection';
import { SpaceShowcase } from './components/SpaceShowcase';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { CMSDashboard } from './cms/CMSDashboard';
import { loadCMSContent, saveCMSContent } from './cms/storage';
import { CafeCMSContent } from './cms/types';
import { ReviewItem } from './types';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cmsContent, setCmsContent] = useState<CafeCMSContent>(() => loadCMSContent());

  // Routing murni via hash: #home = web utama, #cmscafe = CMS
  const [currentHash, setCurrentHash] = useState<string>(() =>
    window.location.hash.toLowerCase()
  );

  useEffect(() => {
    // Default ke #home kalau belum ada hash sama sekali
    if (!window.location.hash) {
      window.location.hash = '#home';
    }

    const handleHashChange = () => {
      setCurrentHash(window.location.hash.toLowerCase());
    };

    window.addEventListener('hashchange', handleHashChange);

    const handleCMSUpdate = () => {
      setCmsContent(loadCMSContent());
    };
    window.addEventListener('kuro_cms_updated', handleCMSUpdate);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('kuro_cms_updated', handleCMSUpdate);
    };
  }, []);

  const isCmsRoute = currentHash.includes('cmscafe');

  if (isCmsRoute) {
    return <CMSDashboard />;
  }

  const handleAddReviewFromSite = (newReview: ReviewItem) => {
    const updatedReviews = [newReview, ...cmsContent.reviews];
    const updatedContent: CafeCMSContent = {
      ...cmsContent,
      reviews: updatedReviews,
    };
    setCmsContent(updatedContent);
    saveCMSContent(updatedContent);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#161514] flex flex-col font-sans selection:bg-[#161514] selection:text-[#F7F5F0]">
      <Navbar
        onOpenBooking={() => setIsModalOpen(true)}
        branding={cmsContent.branding}
      />

      <main className="flex-1">
        <Hero
          onOpenBooking={() => setIsModalOpen(true)}
          hero={cmsContent.hero}
          announcement={cmsContent.branding.announcement}
        />
        <AboutSection philosophy={cmsContent.philosophy} />
        <MenuSection items={cmsContent.menu} />
        <SpaceShowcase spaces={cmsContent.spaces} />
        <ReviewsSection
          reviews={cmsContent.reviews}
          onAddReview={handleAddReviewFromSite}
        />
        <LocationSection location={cmsContent.location} />
      </main>

      <Footer branding={cmsContent.branding} />

      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
        }
