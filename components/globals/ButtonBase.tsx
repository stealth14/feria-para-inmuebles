import React from "react";
import styles from "./ButtonBase.module.scss";

interface ButtonBaseProps {
  rest?: any[];
  children: React.ReactNode | string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ButtonBase(props: ButtonBaseProps) {
  const { onClick, children, ...rest } = props;

  return (
    <div className={styles.base}>
      <button className={styles.base} onClick={onClick} {...rest}>
        {children}
      </button>
    </div>
  );
}
