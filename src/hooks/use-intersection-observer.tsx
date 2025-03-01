
import { useEffect, useState, useRef, RefObject } from 'react';

interface UseIntersectionObserverProps {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver({
  root = null,
  rootMargin = '0px',
  threshold = 0.1,
  freezeOnceVisible = true,
}: UseIntersectionObserverProps = {}) {
  const elementRef = useRef<Element | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const node = elementRef?.current;
    
    if (!node || (freezeOnceVisible && isVisible)) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { root, rootMargin, threshold }
    );

    observer.observe(node);
    
    return () => {
      observer.disconnect();
    };
  }, [elementRef, root, rootMargin, threshold, freezeOnceVisible, isVisible]);

  return { elementRef, isVisible };
}

export function useElementInView<T extends Element = HTMLDivElement>(options?: UseIntersectionObserverProps) {
  const { elementRef, isVisible } = useIntersectionObserver(options);
  
  return [elementRef as RefObject<T>, isVisible] as const;
}
