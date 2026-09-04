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

  // Determine if viewing CMS route via pathname (e.g. /cms) or hash (e.g. #/cms or #cms)
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname.toLowerCase() + window.location.hash.toLowerCase();
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname.toLowerCase() + window.location.hash.toLowerCase());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    // Sync when CMS saves content
    const handleCMSUpdate = () => {
      setCmsContent(loadCMSContent());
    };
    window.addEventListener('kuro_cms_updated', handleCMSUpdate);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('kuro_cms_updated', handleCMSUpdate);
    };
  }, []);

  const isCmsRoute =
    currentPath.includes('/cms') ||
    currentPath.includes('#/cms') ||
    currentPath.includes('#cms');

  // If visiting /cms or #/cms, render dedicated CMS page
  if (isCmsRoute) {
    return <CMSDashboard />;
  }

  // Handle adding review from main site into persistent CMS state
  const handleAddReviewFromSite = (newReview: ReviewItem) => {
    const updatedReviews = [newReview, ...cmsContent.reviews];
    const updatedContent: CafeCMSContent = {
      ...cmsContent,
      reviews: updatedReviews,
    };
    setCmsContent(updatedContent);
    saveCMSContent(updatedContent);
  };

  // Main Customer-Facing Website (Zero CMS buttons as requested)
  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#161514] flex flex-col font-sans selection:bg-[#161514] selection:text-[#F7F5F0]">
      {/* Navigation */}
      <Navbar
        onOpenBooking={() => setIsModalOpen(true)}
        branding={cmsContent.branding}
      />

      {/* Main Content Sections */}
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

      {/* Footer */}
      <Footer branding={cmsContent.branding} />

      {/* Table Reservation Modal */}
      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
