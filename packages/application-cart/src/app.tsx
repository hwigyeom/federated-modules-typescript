import React from 'react';

type Props = { callback?: () => void };

const Cart: React.FC<Props> = ({ callback }) => {
  return (
    <p style={{ background: '#cfc', padding: '1em' }}>
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
