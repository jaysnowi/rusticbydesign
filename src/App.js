import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const BasePrice = 2000;
const BaseLength = 240;
const BaseWidth = 90;

function Table({ length, width, sideOverhang, endOverhang, tableHeight, hasBracing }) {
  const legThickness = 0.1; // 10cm x 10cm legs
  const legOffsetEnd = (length / 100) / 2 - legThickness / 2 - endOverhang / 100;
  const legOffsetZ = (width / 100) / 2 - legThickness / 2 - sideOverhang / 100;

  return (
    <group>
      {/* Tabletop */}
      <mesh position={[0, tableHeight / 2 - 0.025, 0]}>
        <boxGeometry args={[length / 100, 0.05, width / 100]} />
        <lineSegments>
          <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(length / 100, 0.05, width / 100)]} />
          <lineBasicMaterial attach="material" color={'#000000'} linewidth={10} />
        </lineSegments>
      </mesh>

      {/* Table Legs */}
      {[1, -1].map((x) =>
        [1, -1].map((z) => (
          <mesh key={`${x}-${z}`} position={[x * legOffsetEnd, -tableHeight / 2 + (tableHeight - 0.025) / 2, z * legOffsetZ]}>
            <boxGeometry args={[legThickness, tableHeight - 0.025, legThickness]} />
            <lineSegments>
              <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(legThickness, tableHeight - 0.025, legThickness)]} />
              <lineBasicMaterial attach="material" color={'#000000'} linewidth={10} />
            </lineSegments>
          </mesh>
        ))
      )}

      {/* Bottom Bracing */}
      {hasBracing && (
        <>
          {[1, -1].map((x) => (
            <mesh key={`brace-${x}`} position={[x * legOffsetEnd, -tableHeight / 2 + 0.1, 0]}>
              <boxGeometry args={[0.05, 0.05, Math.abs(legOffsetZ * 2)]} />
              <lineSegments>
                <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(0.05, 0.05, Math.abs(legOffsetZ * 2))]} />
                <lineBasicMaterial attach="material" color={'#000000'} linewidth={10} />
              </lineSegments>
            </mesh>
          ))}
          <mesh position={[0, -tableHeight / 2 + 0.1, 0]}>
            <boxGeometry args={[Math.abs(legOffsetEnd * 2), 0.05, 0.05]} />
            <lineSegments>
              <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(Math.abs(legOffsetEnd * 2), 0.05, 0.05)]} />
              <lineBasicMaterial attach="material" color={'#000000'} linewidth={10} />
            </lineSegments>
          </mesh>
        </>
      )}
    </group>
  );
}

function App() {
  const [length, setLength] = useState(240);
  const [width, setWidth] = useState(90);
  const [sideOverhang, setSideOverhang] = useState(10);
  const [endOverhang, setEndOverhang] = useState(20);
  const [tableHeight, setTableHeight] = useState(0.7);
  const [hasBracing, setHasBracing] = useState(false);

  const calculatePrice = () => {
    const lengthFactor = length / BaseLength;
    const widthFactor = width / BaseWidth;
    return Math.round(BasePrice * lengthFactor * widthFactor);
  };

  const handleOrder = () => {
    alert(`Order placed! Total Price: $${calculatePrice()}`);
  };

  return (
    <div className="flex h-screen">
      {/* 3D Visualization */}
      <div className="w-3/5 bg-gray-100">
        <p className="text-center text-gray-600 mt-2">Use your mouse to move and rotate the table.</p>
        <Canvas camera={{ position: [4, 1.5, 4], fov: 50 }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Table length={length} width={width} sideOverhang={sideOverhang} endOverhang={endOverhang} tableHeight={tableHeight} hasBracing={hasBracing} />
          <OrbitControls />
        </Canvas>
      </div>

      {/* Controls */}
      <div className="w-2/5 p-8 bg-white">
        <h1 className="text-2xl font-bold mb-4">Customize Your Table</h1>

        <label className="block mb-2">Table Height: {Math.round(tableHeight * 100)} cm</label>
        <input type="range" min="0.5" max="1.2" step="0.01" value={tableHeight} onChange={(e) => setTableHeight(Number(e.target.value))} className="w-full mb-4" />

        <label className="block mb-2">Length: {length} cm</label>
        <input type="range" min="100" max="300" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full mb-4" />

        <label className="block mb-2">Width: {width} cm</label>
        <input type="range" min="60" max="120" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full mb-4" />

        <label className="block mb-2">Side Overhang: {sideOverhang} cm</label>
        <input type="range" min="0" max="30" value={sideOverhang} onChange={(e) => setSideOverhang(Number(e.target.value))} className="w-full mb-4" />

        <label className="block mb-2">End Overhang: {endOverhang} cm</label>
        <input type="range" min="0" max="30" value={endOverhang} onChange={(e) => setEndOverhang(Number(e.target.value))} className="w-full mb-4" />

        <label className="block mb-2">Bottom Bracing:</label>
        <select value={hasBracing ? 'Yes' : 'No'} onChange={(e) => setHasBracing(e.target.value === 'Yes')} className="mb-4">
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <p className="text-lg font-semibold">Estimated Price: ${calculatePrice()}</p>
        <button onClick={handleOrder} className="mt-4 px-6 py-3 bg-blue-500 text-white font-bold rounded">Place Order</button>
      </div>
    </div>
  );
}

export default App;
