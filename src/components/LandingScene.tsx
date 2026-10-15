import React from 'react';

type SceneProps = {
  onNavigate?: (path: string) => void;
};

export function Scene({ onNavigate }: SceneProps) {
  return (
    <div className="shader-frame fixed inset-0 w-screen h-screen bg-[#383b34] overflow-y-auto overflow-x-hidden z-50">
      <iframe
        title="Iris Biotech — 3D Living Floriculture Experience"
        src="/landing-pages/inner-green-3d.html"
        className="w-full h-full border-0 block"
        style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
      />
    </div>
  );
}
