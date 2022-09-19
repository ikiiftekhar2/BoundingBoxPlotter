import './App.css';
import Canvas from './components/designer/Canvas';

function App() {
  return (
    <div className="App">


      <div style={{
        display: 'flex',
        height: '60%',
        width: '60%',
        backgroundColor: '#fafafa'
      }}
      >  <Canvas> </Canvas>
      </div>
    
    </div>
  );
}


export default App;
