import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { pages } from "./mockPages";

export default function DoubleList() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const next = () => {
    if (current < pages.length - 1) {
      const newIndex = current + 1;
      setCurrent(newIndex);
      navigate(pages[newIndex].path);
    }
  };

  const prev = () => {
    if (current > 0) {
      const newIndex = current - 1;
      setCurrent(newIndex);
      navigate(pages[newIndex].path);
    }
  };

  return (
    <div>
      <h2>Página visitada:</h2>
      <div>
        <strong>{pages[current].name}</strong>
      </div>
      <button onClick={prev} disabled={current === 0}>Atrás</button>
      <button onClick={next} disabled={current === pages.length - 1}>Adelante</button>
    </div>
  );
}