// App.jsx (React component)
import { useEffect, useRef, useState } from 'react';
import { init3DScene } from './3dScript';
//import css  
import './App.css'

function App() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  
  // Light control states
  const [ambientIntensity, setAmbientIntensity] = useState(0.5);
  const [directionalIntensity, setDirectionalIntensity] = useState(1);
  const [pointIntensity, setPointIntensity] = useState(0.5);
  
  // Light position states
  const [directionalPos, setDirectionalPos] = useState({ x: 5, y: 5, z: 5 });
  const [pointPos, setPointPos] = useState({ x: -5, y: 5, z: 5 });
  
  // Helmet position/rotation/scale states
  const [helmetPos, setHelmetPos] = useState({ x: 0, y: 0, z: 0 });
  const [helmetRot, setHelmetRot] = useState({ x: 0, y: 0, z: 0 });
  const [helmetScale, setHelmetScale] = useState(1);
  // Post-processing states
  const [bloomEnabled, setBloomEnabled] = useState(true);
  const [bloomStrength, setBloomStrength] = useState(0);
  const [bloomRadius, setBloomRadius] = useState(0.4);
  const [bloomThreshold, setBloomThreshold] = useState(0.85);
  const [glitchEnabled, setGlitchEnabled] = useState(false);
  const [filmEnabled, setFilmEnabled] = useState(false);
  const [filmIntensity, setFilmIntensity] = useState(0.35);
  
  useEffect(() => {
    if (canvasRef.current) {
      const result = init3DScene(canvasRef.current);
      sceneRef.current = result;
      return result.cleanup;
    }
  }, []);

  // Update light intensities
  useEffect(() => {
    if (sceneRef.current?.lights) {
      sceneRef.current.lights.ambientLight.intensity = ambientIntensity;
      sceneRef.current.lights.directionalLight.intensity = directionalIntensity;
      sceneRef.current.lights.pointLight.intensity = pointIntensity;
    }
  }, [ambientIntensity, directionalIntensity, pointIntensity]);

  // Update light positions
  useEffect(() => {
    if (sceneRef.current?.lights) {
      sceneRef.current.lights.directionalLight.position.set(directionalPos.x, directionalPos.y, directionalPos.z);
      sceneRef.current.lights.pointLight.position.set(pointPos.x, pointPos.y, pointPos.z);
    }
  }, [directionalPos, pointPos]);

  // Update helmet transforms
  useEffect(() => {
    const helmet = sceneRef.current?.getHelmet?.();
    if (helmet) {
      helmet.position.set(helmetPos.x, helmetPos.y, helmetPos.z);
      helmet.rotation.set(helmetRot.x, helmetRot.y, helmetRot.z);
      helmet.scale.setScalar(helmetScale);
    }
  }, [helmetPos, helmetRot, helmetScale]);

  // Update bloom pass
  useEffect(() => {
    const pp = sceneRef.current?.postProcessing;
    if (pp?.bloomPass) {
      pp.bloomPass.enabled = bloomEnabled;
      pp.bloomPass.strength = bloomStrength;
      pp.bloomPass.radius = bloomRadius;
      pp.bloomPass.threshold = bloomThreshold;
    }
  }, [bloomEnabled, bloomStrength, bloomRadius, bloomThreshold]);

  // Update glitch pass
  useEffect(() => {
    const pp = sceneRef.current?.postProcessing;
    if (pp?.glitchPass) {
      pp.glitchPass.enabled = glitchEnabled;
    }
  }, [glitchEnabled]);

  // Update film pass
  useEffect(() => {
    const pp = sceneRef.current?.postProcessing;
    if (pp?.filmPass) {
      pp.filmPass.enabled = filmEnabled;
      pp.filmPass.uniforms.intensity.value = filmIntensity;
    }
  }, [filmEnabled, filmIntensity]);
  

  return (
    <>
      <div>
      <canvas ref={canvasRef} id="canvas"></canvas>
      {/* <img className="logo" src="./logo2.jpg" alt="cyberpunkLogo" /> */}
      </div>
      
      {/* Lighting Panel */}
      <div className="control-panel lighting-panel">
        <h3>Lighting</h3>
        
        <div className="control-group">
          <label>Ambient Light</label>
          <input 
            type="range" 
            min="0" 
            max="2" 
            step="0.1" 
            value={ambientIntensity}
            onChange={(e) => setAmbientIntensity(parseFloat(e.target.value))}
          />
          <span>{ambientIntensity.toFixed(1)}</span>
        </div>
        
        <div className="control-group">
          <label>Directional Light</label>
          <input 
            type="range" 
            min="0" 
            max="2" 
            step="0.1" 
            value={directionalIntensity}
            onChange={(e) => setDirectionalIntensity(parseFloat(e.target.value))}
          />
          <span>{directionalIntensity.toFixed(1)}</span>
        </div>
        
        <div className="control-group">
          <label>Point Light</label>
          <input 
            type="range" 
            min="0" 
            max="2" 
            step="0.1" 
            value={pointIntensity}
            onChange={(e) => setPointIntensity(parseFloat(e.target.value))}
          />
          <span>{pointIntensity.toFixed(1)}</span>
        </div>
      </div>

      {/* Light Positions Panel */}
      <div className="control-panel light-positions-panel">
        <h3>Light Positions</h3>
        
        <div className="control-group">
          <label>Directional Light Pos</label>
          <div className="vector-inputs">
            <input 
              type="number" 
              value={directionalPos.x}
              onChange={(e) => setDirectionalPos(p => ({ ...p, x: parseFloat(e.target.value) }))}
              placeholder="X"
            />
            <input 
              type="number" 
              value={directionalPos.y}
              onChange={(e) => setDirectionalPos(p => ({ ...p, y: parseFloat(e.target.value) }))}
              placeholder="Y"
            />
            <input 
              type="number" 
              value={directionalPos.z}
              onChange={(e) => setDirectionalPos(p => ({ ...p, z: parseFloat(e.target.value) }))}
              placeholder="Z"
            />
          </div>
        </div>
        
        <div className="control-group">
          <label>Point Light Pos</label>
          <div className="vector-inputs">
            <input 
              type="number" 
              value={pointPos.x}
              onChange={(e) => setPointPos(p => ({ ...p, x: parseFloat(e.target.value) }))}
              placeholder="X"
            />
            <input 
              type="number" 
              value={pointPos.y}
              onChange={(e) => setPointPos(p => ({ ...p, y: parseFloat(e.target.value) }))}
              placeholder="Y"
            />
            <input 
              type="number" 
              value={pointPos.z}
              onChange={(e) => setPointPos(p => ({ ...p, z: parseFloat(e.target.value) }))}
              placeholder="Z"
            />
          </div>
        </div>
      </div>

      {/* Position Panel */}
      <div className="control-panel position-panel">
        <h3>Helmet Transform</h3>
        
        <div className="control-group">
          <label>Position</label>
          <div className="vector-inputs">
            <input 
              type="number" 
              value={helmetPos.x}
              onChange={(e) => setHelmetPos(p => ({ ...p, x: parseFloat(e.target.value) }))}
              placeholder="X"
            />
            <input 
              type="number" 
              value={helmetPos.y}
              onChange={(e) => setHelmetPos(p => ({ ...p, y: parseFloat(e.target.value) }))}
              placeholder="Y"
            />
            <input 
              type="number" 
              value={helmetPos.z}
              onChange={(e) => setHelmetPos(p => ({ ...p, z: parseFloat(e.target.value) }))}
              placeholder="Z"
            />
          </div>
        </div>
        
        <div className="control-group">
          <label>Rotation (radians)</label>
          <div className="vector-inputs">
            <input 
              type="number" 
              step="0.1"
              value={helmetRot.x}
              onChange={(e) => setHelmetRot(r => ({ ...r, x: parseFloat(e.target.value) }))}
              placeholder="X"
            />
            <input 
              type="number" 
              step="0.1"
              value={helmetRot.y}
              onChange={(e) => setHelmetRot(r => ({ ...r, y: parseFloat(e.target.value) }))}
              placeholder="Y"
            />
            <input 
              type="number" 
              step="0.1"
              value={helmetRot.z}
              onChange={(e) => setHelmetRot(r => ({ ...r, z: parseFloat(e.target.value) }))}
              placeholder="Z"
            />
          </div>
        </div>
        
        <div className="control-group">
          <label>Scale</label>
          <input 
            type="range" 
            min="0.1" 
            max="3" 
            step="0.1" 
            value={helmetScale}
            onChange={(e) => setHelmetScale(parseFloat(e.target.value))}
          />
          <span>{helmetScale.toFixed(1)}</span>
        </div>
      </div>

      {/* Post Processing Panel */}
      <div className="control-panel postprocessing-panel">
        <h3>Post Processing</h3>
        
        <div className="control-group checkbox-group">
          <label>
            <input 
              type="checkbox" 
              checked={bloomEnabled}
              onChange={(e) => setBloomEnabled(e.target.checked)}
            />
            Bloom Effect
          </label>
        </div>
        
        {bloomEnabled && (
          <>
            <div className="control-group">
              <label>Bloom Strength</label>
              <input 
                type="range" 
                min="0" 
                max="2" 
                step="0.1" 
                value={bloomStrength}
                onChange={(e) => setBloomStrength(parseFloat(e.target.value))}
              />
              <span>{bloomStrength.toFixed(1)}</span>
            </div>
            
            <div className="control-group">
              <label>Bloom Radius</label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.05" 
                value={bloomRadius}
                onChange={(e) => setBloomRadius(parseFloat(e.target.value))}
              />
              <span>{bloomRadius.toFixed(2)}</span>
            </div>
            
            <div className="control-group">
              <label>Bloom Threshold</label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.05" 
                value={bloomThreshold}
                onChange={(e) => setBloomThreshold(parseFloat(e.target.value))}
              />
              <span>{bloomThreshold.toFixed(2)}</span>
            </div>
          </>
        )}
        
        <div className="control-group checkbox-group">
          <label>
            <input 
              type="checkbox" 
              checked={glitchEnabled}
              onChange={(e) => setGlitchEnabled(e.target.checked)}
            />
            Glitch Effect
          </label>
        </div>
        
        <div className="control-group checkbox-group">
          <label>
            <input 
              type="checkbox" 
              checked={filmEnabled}
              onChange={(e) => setFilmEnabled(e.target.checked)}
            />
            Film Grain
          </label>
        </div>
        
        {filmEnabled && (
          <div className="control-group">
            <label>Film Intensity</label>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.05" 
              value={filmIntensity}
              onChange={(e) => setFilmIntensity(parseFloat(e.target.value))}
            />
            <span>{filmIntensity.toFixed(2)}</span>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
