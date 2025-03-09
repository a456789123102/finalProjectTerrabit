import React from 'react';
import { PropsWithChildren } from 'react';

type Props = {
    children: number; 
  className?: string;
};

function Number({ children, className }: PropsWithChildren<Props>) {
  return (
    <div className={`${className}`}>
      {Math.round(children *100)/100} 
    </div>
  );
}

export default Number;
