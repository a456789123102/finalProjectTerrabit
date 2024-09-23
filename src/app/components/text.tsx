import React from 'react';
import { PropsWithChildren } from 'react';

type Props = {
  className?: string;
};

// แก้ไขการกำหนด PropsWithChildren
function Text({ children, className }: PropsWithChildren<Props>) {
  return (
    <div className={`font-pixelify ${className}`}>
      {children}
    </div>
  );
}

export default Text;
