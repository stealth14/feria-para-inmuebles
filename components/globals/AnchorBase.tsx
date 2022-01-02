import React from "react";
import styles from "./AnchorBase.module.scss";

interface AnchorBase {
  onClick: () => void;
  children: React.ReactNode;
  [propName: string]: any;
}

export default function AnchorBase(props: AnchorBase) {
  const { onClick, className, children, ...rest } = props;
  return (
    <div
      {...rest}
      className={`${styles.container} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
