import React from 'react';

export default function IconButton({ Icon, Title, onClick }) {

  return (
    <div className="IconButton" onClick={onClick}>
      <div className="IconButton_Icon">
        {Icon}
      </div>
      <div className="IconButton_Title">
        {Title}
      </div>
    </div>
  );
}
