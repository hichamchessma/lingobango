import React, { useRef, useEffect } from 'react';
import './Cube3D.css';

export default function Cube3D({ word }) {
  const containerRef = useRef(null);
  const cubeRef = useRef(null);

  const startPos = useRef(null);
  const startRotation = useRef({ x: 0, y: 0 });
  const activeAxis = useRef(null);
  const anglePerFace = 90;
  const threshold = anglePerFace / 2;

  useEffect(() => {
    const container = containerRef.current;
    const cube = cubeRef.current;

    const onMouseDown = (e) => {
      e.preventDefault();
      startPos.current = { x: e.clientX, y: e.clientY };
      const transform = cube.style.transform.match(/rotateX\((-?\d+)deg\) rotateY\((-?\d+)deg\)/);
      startRotation.current = {
        x: transform ? parseFloat(transform[1]) : 0,
        y: transform ? parseFloat(transform[2]) : 0,
      };
      activeAxis.current = null;

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      if (!startPos.current) return;
      const dx = e.clientX - startPos.current.x;
      const dy = e.clientY - startPos.current.y;

      if (!activeAxis.current) {
        activeAxis.current = Math.abs(dx) > Math.abs(dy) ? 'y' : 'x';
      }

      let newX = startRotation.current.x;
      let newY = startRotation.current.y;

      if (activeAxis.current === 'y') {
        newY += dx / 2;
      } else if (activeAxis.current === 'x') {
        newX -= dy / 2;
      }

      cube.style.transform = `rotateX(${newX}deg) rotateY(${newY}deg)`;
    };

    const onMouseUp = () => {
      if (!startPos.current) return;
      const cube = cubeRef.current;
      const transform = cube.style.transform.match(/rotateX\((-?\d+(?:\.\d+)?)deg\) rotateY\((-?\d+(?:\.\d+)?)deg\)/);
      let finalX = transform ? parseFloat(transform[1]) : 0;
      let finalY = transform ? parseFloat(transform[2]) : 0;

      if (activeAxis.current === 'y') {
        const delta = finalY - startRotation.current.y;
        if (Math.abs(delta) > threshold) {
          finalY = Math.round((startRotation.current.y + Math.sign(delta) * anglePerFace) / anglePerFace) * anglePerFace;
        } else {
          finalY = Math.round(startRotation.current.y / anglePerFace) * anglePerFace;
        }
        finalX = Math.round(finalX / anglePerFace) * anglePerFace;
      } else if (activeAxis.current === 'x') {
        const delta = finalX - startRotation.current.x;
        if (Math.abs(delta) > threshold) {
          finalX = Math.round((startRotation.current.x + Math.sign(delta) * anglePerFace) / anglePerFace) * anglePerFace;
        } else {
          finalX = Math.round(startRotation.current.x / anglePerFace) * anglePerFace;
        }
        finalY = Math.round(finalY / anglePerFace) * anglePerFace;
      }

      cube.style.transition = 'transform 0.3s ease';
      cube.style.transform = `rotateX(${finalX}deg) rotateY(${finalY}deg)`;

      setTimeout(() => {
        cube.style.transition = ''; // enlever la transition après le snap
      }, 300);

      startPos.current = null;
      activeAxis.current = null;

      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    container.addEventListener('mousedown', onMouseDown);

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <div ref={containerRef} className="cube3d-container">
      <div ref={cubeRef} className="cube3d">
        <div className="cube3d-face cube3d-front">{word}</div>
        <div className="cube3d-face cube3d-back">{word}</div>
        <div className="cube3d-face cube3d-right">{word}</div>
        <div className="cube3d-face cube3d-left">{word}</div>
        <div className="cube3d-face cube3d-top">{word}</div>
        <div className="cube3d-face cube3d-bottom">{word}</div>
      </div>
    </div>
  );
}
