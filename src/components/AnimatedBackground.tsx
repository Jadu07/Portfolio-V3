"use client";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Pure CSS Animations embedded to ensure they never freeze and bypass framer-motion pausing */}


      {/* Base container for blur effect matching Gradient Blur */}
      <div 
        className="fixed opacity-100"
        style={{
          width: '85%',
          height: '559px',
          top: 'calc(54.875% - 279.5px)',
          left: '7.66667%',
          filter: 'blur(80px)',
          backgroundColor: 'rgb(20, 20, 20)',
          transform: 'translateZ(0)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          position: 'fixed'
        }}
      >
        <div style={{ position: 'absolute', width: '500px', height: '500px', backgroundColor: 'rgb(54, 101, 133)', borderRadius: '40%', opacity: 0.9, top: '-10%', left: '-10%', animation: 'blob1 4s infinite ease-in-out', willChange: 'transform' }} />
        <div style={{ position: 'absolute', width: '600px', height: '600px', backgroundColor: 'rgb(42, 63, 77)', borderRadius: '35%', opacity: 0.9, top: '20%', left: '50%', animation: 'blob2 5s infinite ease-in-out', willChange: 'transform' }} />
        <div style={{ position: 'absolute', width: '450px', height: '450px', backgroundColor: 'rgb(17, 47, 56)', borderRadius: '45%', opacity: 0.9, top: '40%', left: '-5%', animation: 'blob3 6s infinite ease-in-out', willChange: 'transform' }} />
        <div style={{ position: 'absolute', width: '700px', height: '700px', backgroundColor: 'rgb(0, 0, 0)', borderRadius: '30%', opacity: 0.7, top: '-20%', left: '40%', animation: 'blob4 3s infinite ease-in-out', willChange: 'transform' }} />
        <div style={{ position: 'absolute', width: '550px', height: '550px', backgroundColor: 'rgb(77, 54, 133)', borderRadius: '50%', opacity: 0.9, top: '10%', left: '15%', animation: 'blob5 5s infinite ease-in-out', willChange: 'transform' }} />
        <div style={{ position: 'absolute', width: '480px', height: '480px', backgroundColor: 'rgb(54, 101, 133)', borderRadius: '42%', opacity: 0.9, top: '30%', left: '55%', animation: 'blob6 7s infinite ease-in-out', willChange: 'transform' }} />
      </div>

      {/* Noise Grain Filter */}
      <div 
        className="fixed inset-0"
        style={{
          opacity: 0.075,
          backgroundImage: 'url(/noise.png)',
          backgroundSize: '128px',
          backgroundRepeat: 'repeat',
          zIndex: 10
        }}
      />
    </div>
  );
}
