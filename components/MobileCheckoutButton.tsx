'use client';

import { useEffect, useState } from 'react';
import { PRICING } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';

export function MobileCheckoutButton() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Get both checkout and footer sections
      const checkoutSection = document.getElementById('checkout');
      const footerSection = document.getElementById('footer');
      
      if (!checkoutSection || !footerSection) return;

      // Get the positions
      const checkoutPosition = checkoutSection.getBoundingClientRect();
      const footerPosition = footerSection.getBoundingClientRect();
      
      // Hide button if either checkout section or footer is visible
      if (
        (checkoutPosition.top < window.innerHeight && checkoutPosition.bottom > 0) ||
        (footerPosition.top < window.innerHeight && footerPosition.bottom > 0)
      ) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Add padding to the bottom of the page when button is visible
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (footer && isVisible) {
      // Add padding to footer when button is visible (mobile only)
      const mediaQuery = window.matchMedia('(max-width: 768px)');
      if (mediaQuery.matches) {
        footer.style.paddingBottom = '70px'; // Adjust based on button height
      }
    } else if (footer) {
      footer.style.paddingBottom = '0';
    }
    
    return () => {
      // Cleanup when component unmounts
      const footer = document.querySelector('footer');
      if (footer) {
        footer.style.paddingBottom = '0';
      }
    };
  }, [isVisible]);

  const handleClick = () => {
    const checkoutSection = document.getElementById('checkout');
    if (checkoutSection) {
      checkoutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-0 left-0 right-0 bg-[#5D28E0] p-3 shadow-lg md:hidden z-50 rounded-t-xl"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
        >
          <div className="flex items-center justify-between px-3">
            <div className="flex flex-col">
              <motion.span
                className="font-hind-siliguri text-white text-sm mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                স্পেশাল অফার
              </motion.span>
              <motion.div 
                className="font-hind-siliguri text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-2xl font-bold text-[1.1em]">1500৳</span>{" "}
                <span className="text-lg line-through opacity-70 text-[1.1em]">4500৳</span>
              </motion.div>
            </div>
            <motion.button 
              onClick={handleClick}
              className="font-hind-siliguri bg-white text-[#5D28E0] px-6 py-2.5 rounded-lg font-medium text-[1.1em]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              এনরোল করুন
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
