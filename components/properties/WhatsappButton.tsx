import React from "react";
import styles from "./WhatsappButton.module.scss";
import Image from "next/image";

interface WhatsappButtonProps {
  phone: string;
  children: React.ReactNode | string;
}

export default function WhatsappButton(props: WhatsappButtonProps) {
  const { children, phone } = props;

  return (
    <div className={styles.container}>
      <Image width={30} height={30} src="/wp-icon.png" alt="Whatsapp" />
      {children}
    </div>
  );
}
