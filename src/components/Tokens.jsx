import React from 'react';

const Tokens = ({ tokens, i }) => {
  const maxInfluence = Math.max(...tokens.map(t => Math.abs(t.influence)));
  const normalizedTokens = tokens.map(t => ({ ...t, influence: t.influence / maxInfluence }));

  return (
    <div>
      <span>{i + 1}. </span>
      {normalizedTokens.map((token, index) => {
        let color;
        if (token.influence >= 0) {
          const opacity = token.influence.toFixed(9).substring(1);
          color = `rgba(0, 0, 255, ${opacity})`; // blue for positive
        } else {
          const opacity = Math.abs(token.influence).toFixed(9).substring(1);
          color = `rgba(255, 0, 0, ${opacity})`; // red for negative
        }

        return (
          <span key={index} style={{backgroundColor: color}}>
            <span>{token.token}</span>
            <span style={{position: 'absolute', inset: 0, backgroundClip: 'text', color: 'transparent'}}>{token.token}</span>
          </span>
        );
      })}
    </div>
  );
};

export default Tokens;