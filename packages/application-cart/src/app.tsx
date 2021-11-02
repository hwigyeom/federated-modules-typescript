import React from 'react';

import './app.tsx.scss';

type Props = { callback?: () => void };

const Cart: React.FC<Props> = ({ callback }) => {
  return (
    <p className="para">
      Hello from Cart!
      {callback && (
        <>
          <br />
          <button onClick={() => callback()}>Trigger callback on host</button>
        </>
      )}
    </p>
  );
};

export default Cart;
