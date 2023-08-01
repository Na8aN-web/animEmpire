import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gradient-to-r from-blue-500 to-purple-500 hover:from-pink-500 hover:to-indigo-500 hover:bg-gradient-to-r"></div>
      <div className="text-[16px] md:text-4xl font-bold mt-8 text-white neon-glow font-mont">
        animEmpire
      </div>
    </div>
  );
};

export default Loader;
