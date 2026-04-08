import { useState, useRef, useEffect } from 'react';

export const useSimulador = () => {
  const [activa, setActiva] = useState(false);
  const [segundos, setSegundos] = useState(0);
  const [litros, setLitros] = useState(0);
  const [temp, setTemp] = useState(18);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const CAUDAL_FIJO = 8.5; 

  useEffect(() => {
    if (activa) {
      intervalRef.current = setInterval(() => {
        setSegundos(s => s + 1);
        setLitros(l => l + (CAUDAL_FIJO / 60));
        setTemp(t => (t < 38 ? t + 0.5 : t));
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [activa]);

  const toggle = () => setActiva(!activa);

  const reset = () => {
    setActiva(false);
    setSegundos(0);
    setLitros(0);
    setTemp(18);
  };

  return {
    activa,
    segundos,
    litros,
    temp,
    caudal: activa ? CAUDAL_FIJO : 0,
    toggle,
    reset
  };
};