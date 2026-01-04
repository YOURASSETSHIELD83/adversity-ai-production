
import React from 'react';

const Philosophy: React.FC = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden bg-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
      <div className="max-w-5xl mx-auto text-center relative">
        <div className="mb-12 inline-block">
            <svg className="w-10 h-10 text-indigo-500/40 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.89543 14.9124 3 16.017 3H19.017C21.2261 3 23.017 4.79086 23.017 7V15C23.017 18.866 19.883 22 16.017 22H14.017V21ZM3 21L3 18C3 16.8954 3.89543 16 5 16H8C8.55228 16 9 15.5523 9 15V9C9 8.44772 8.55228 8 8 8H5C3.89543 8 3 7.10457 3 6V5C3 3.89543 3.89543 3 5 3H8C10.2091 3 12 4.79086 12 7V15C12 18.866 8.86599 22 5 22H3V21Z" />
            </svg>
        </div>
        <h2 className="text-3xl md:text-5xl font-extralight italic leading-snug text-white/95 tracking-tight px-4">
          "Adversity is a state where you become <br className="hidden md:block" /> 
          <span className="text-indigo-400 font-black not-italic">intimately acquainted</span> with who you truly are."
        </h2>
        <div className="mt-10 flex flex-col items-center justify-center">
            <div className="h-px w-12 bg-indigo-500/50 mb-4"></div>
            <p className="text-[10px] font-black tracking-[0.5em] text-gray-500 uppercase">Founder's Philosophy</p>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
