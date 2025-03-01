
import { useEffect } from 'react';

interface UseSmoothScrollOptions {
  offset?: number;
  behavior?: ScrollBehavior;
}

export function useSmoothScroll({ offset = 0, behavior = 'smooth' }: UseSmoothScrollOptions = {}) {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (
        anchor && 
        anchor.href && 
        anchor.href.startsWith(window.location.origin) && 
        anchor.href.includes('#')
      ) {
        const hash = anchor.href.split('#').pop();
        
        if (hash) {
          e.preventDefault();
          const element = document.getElementById(hash);
          
          if (element) {
            const rect = element.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const top = rect.top + scrollTop - offset;
            
            window.scrollTo({
              top,
              behavior,
            });
            
            // Update URL hash without scrolling
            history.pushState(null, '', `#${hash}`);
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [offset, behavior]);
}

export default useSmoothScroll;
