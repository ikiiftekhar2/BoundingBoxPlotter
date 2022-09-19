
import React, { useRef, useEffect, useState } from 'react'
import rough from 'roughjs/bundled/rough.esm'

const generator = rough.generator()

const Canvas = props => {
  

  const [elements, setElements] = useState([])
  const [drawing, setDrawing] = useState([false])
  const canvasRef = useRef(null)
  
  function createElement(x1, y1, x2, y2) {
    const roughElement = generator.rectangle(x1, y1, x2-x1, y2-y1)
    return {x1, y1, x2, y2, roughElement}
  }


  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
    
    
    const roughCanvas = rough.canvas(canvas)

    //Our first draw
    elements.forEach(({roughElement}) => roughCanvas.draw(roughElement))
    

  }, [elements])


  const handleMouseUp = (event) => {
    setDrawing(false);
  }

  const handleMouseMove = (event) => {
    if (!drawing) return;

    const {clientX, clientY} = event;
    const index = elements.length - 1;
    const {x1, y1} = elements[index];
    const updatedElement = createElement(x1, y1, clientX, clientY);


    const elementsCopy = [...elements]
    elementsCopy[index] = updatedElement;
    setElements(elementsCopy)
  }

  const handleMouseDown = (event) => {
    setDrawing(true);
    const {clientX, clientY} = event;
    console.log(clientX, clientY)
    const element = createElement(clientX, clientY, clientX, clientY)
    setElements(prevState => [...prevState, element])
  }
  
  return (
  <canvas ref={canvasRef} {...props} 
  onMouseDown={handleMouseDown}
  onMouseUp={handleMouseUp}
  onMouseMove= {handleMouseMove}
  width={window.innerWidth}
  height={window.innerHeight}/>
      )
}

export default Canvas