import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../common/Button';

const CompanyStory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax effect on scroll for all images
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const scrollPosition = window.scrollY;
      const sectionPosition = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      // Only apply effect when section is in view
      if (scrollPosition > sectionPosition - window.innerHeight &&
          scrollPosition < sectionPosition + sectionHeight) {

        const images = section.querySelectorAll<HTMLImageElement>('img');

        images.forEach((image, index) => {
          const distance = scrollPosition - (sectionPosition - window.innerHeight);

          // Alternate direction based on index: even indices move up, odd indices move down
          const direction = index % 2 === 0 ? 0.05 : -0.03;
          image.style.transform = `translateY(${distance * direction}px)`;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
      <section ref={sectionRef} id="about" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-serif font-semibold text-forest-900 mb-4">
              Our Story
            </h2>
            <p className="text-lg text-gray-600">
              From the lush forests and vibrant meadows of Sri Lanka to your table — a journey of sustainability, quality, and tradition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center mb-16">
            <div className="relative">
              <img
                  src="/images/Hero5.jpg"
                  alt="Sri Lankan tea plantations"
                  className="rounded-lg shadow-lg"
              />
              <img
                  src="/images/Hero2.jpg"
                  alt="Sri Lankan beekeeper"
                  className="absolute -bottom-8 -right-8 w-2/3 rounded-lg shadow-lg border-4 border-white"
              />
            </div>

            <div>
              <h3 className="text-2xl font-serif font-semibold text-forest-900 mb-4">
                Sustainable Partnerships
              </h3>
              <p className="text-gray-700 mb-4">
                Ceylon Nectar was founded on a simple principle: to create a direct bridge between Sri Lanka's skilled beekeepers and conscious consumers worldwide.
              </p>
              <p className="text-gray-700 mb-6">
                We partner with over 200 local beekeepers across Sri Lanka, ensuring fair compensation, sustainable practices, and the preservation of ancient beekeeping traditions that have been passed down through generations.
              </p>
              <Button
                  to="#impact"
                  variant="outline"
                  icon={<ArrowRight size={18} />}
                  iconPosition="right"
              >
                Learn About Our Impact
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-serif font-semibold text-forest-900 mb-4">
                Quality & Tradition
              </h3>
              <p className="text-gray-700 mb-4">
                Each jar of Ceylon Nectar honey carries the distinct character of its origin — from the cinnamon estates of the south to the tea plantations of the central highlands.
              </p>
              <p className="text-gray-700 mb-6">
                Our commitment to quality means we never mass-process our honey. All our products are raw, unfiltered, and harvested with care to preserve the unique enzymes, pollens, and flavors that make Sri Lankan honey special.
              </p>
              <Button
                  to="/shop"
                  variant="primary"
                  icon={<ArrowRight size={18} />}
                  iconPosition="right"
              >
                Explore Our Collection
              </Button>
            </div>

            <div className="relative order-1 md:order-2">
              <img
                  src="/images/Hero8.jpg"
                  alt="Honey processing"
                  className="rounded-lg shadow-lg"
              />
              <img
                  src="/images/Hero7.webp"
                  alt="Honey varieties"
                  className="absolute -bottom-8 -left-8 w-2/3 rounded-lg shadow-lg border-4 border-white"
              />
            </div>
          </div>
        </div>
      </section>
  );
};

export default CompanyStory;