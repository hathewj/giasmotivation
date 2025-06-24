import { useSpring, animated } from '@react-spring/web';
import { useState } from 'react';

export default function ExplodingIcon({ icon }) {
  const [explode, setExplode] = useState(false);

  const style = useSpring({
    transform: explode ? 'scale(3) rotate(360deg)' : 'scale(1) rotate(0deg)',
    config: { tension: 200, friction: 20 },
    onRest: () => explode && setExplode(false),
  });

  return (
    <animated.div
      onClick={() => setExplode(true)}
      style={{
        ...style,
        display: 'inline-block',
        margin: '20px',
        cursor: 'pointer',
        border: '2px dashed red',
        background: 'rgba(255,255,255,0.5)',
        padding: '10px',
      }}
    >
      {icon}
    </animated.div>
  );
}