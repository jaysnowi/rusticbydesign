import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const TableCustomizer = () => {
  const [length, setLength] = useState(240);
  const [width, setWidth] = useState(90);
  const [height, setHeight] = useState(75);
  const [material, setMaterial] = useState('Wood');
  const [legStyle, setLegStyle] = useState('Square');
  const [finish, setFinish] = useState('Natural');

  const basePrice = 2000;
  const sizeMultiplier = (length / 240) * (width / 90);
  const price = Math.round(basePrice * sizeMultiplier);

  return (
    <div className="flex">
      <div className="w-1/3 p-4 space-y-4">
        <h1 className="text-2xl font-bold">Customize Your Table</h1>

        <label>Length: {length} cm</label>
        <input type="range" min="120" max="300" value={length} onChange={e => setLength(Number(e.target.value))} />

        <label>Width: {width} cm</label>
        <input type="range" min="60" max="120" value={width} onChange={e => setWidth(Number(e.target.value))} />

        <label>Height: {height} cm</label>
        <input type="range" min="60" max="90" value={height} onChange={e => setHeight(Number(e.target.value))} />

        <label>Material:</label>
        <select value={material} onChange={e => setMaterial(e.target.value)}>
          <option>Wood</option>
          <option>Metal</option>
        </select>

        <label>Leg Style:</label>
        <select value={legStyle} onChange={e => setLegStyle(e.target.value)}>
          <option>Square</option>
          <option>Round</option>
        </select>

        <label>Finish:</label>
        <select value={finish} onChange={e => setFinish(e.target.value)}>
          <option>Natural</option>
          <option>Dark Stain</option>
          <option>Matte Black</option>
        </select>

        <h2 className="text-xl font-bold">Price: ${price}</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Order Now</button>
      </div>

      <div className="w-2/3 h-screen">
        <Canvas>
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Table length={length} width={width} height={height} />
        </Canvas>
      </div>
    </div>
  );
};

const Table = ({ length, width, height }) => {
  return (
    <mesh>
      <boxGeometry args={[length / 100, height / 100, width / 100]} />
      <meshStandardMaterial color="sienna" />
    </mesh>
  );
};

export default TableCustomizer;
