import React, { useState, useEffect } from "react";
import './styles.css'
import { Link } from "react-router-dom";
interface Bar {
  filled?: boolean; // optional because it's undefined initially
}

export default function App() {
    const [bars, setBars] = useState<Bar[]>([]);

  function useAddbar() {
    setBars((prev) => [...prev, {}]);
  }

  useEffect(() => {
    // Animate the last added bar
    if (bars.length > 0) {
      const newBars = [...bars];
      newBars[newBars.length - 1].filled = true;
      setTimeout(() => setBars(newBars), 50); // small delay to trigger CSS transition
    }
  }, [bars.length]);

  return (
    <div>
<nav className="nav-links">
  <Link to="/">Home</Link>
</nav>

      <button onClick={useAddbar}>Add</button>
      {bars.map((bar, index) => (
        <div className="progress-container" key={index}>
          <div
            className="bar"
            style={{ width: bar.filled ? "100%" : "0%" }}
          ></div>
        </div>
      ))}
    </div>
  );
}
