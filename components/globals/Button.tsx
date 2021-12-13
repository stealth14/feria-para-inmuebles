import React, { Children } from "react";
import ButtonBase from "@/components/globals/ButtonBase";
import styles from "@/components/globals/Button.module.scss";

interface ButtonProps {
  [propName: string]: any;
}

export default function Button(props: ButtonProps) {
  const { children } = props;
  return (
    <div className={styles.button}>
      <button {...props}>
        {children}
      </button>
    </div>
  );
}
