import React from "react";
import { PageHeader } from "antd";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseDamage } from "@fortawesome/free-solid-svg-icons";

import AnchorBase from "./globals/AnchorBase";

import styles from "./GeneralNav.module.scss";

const Extra = () => {
  const router = useRouter();

  return (
    <div>
      <AnchorBase
        className={styles.action}
        onClick={() => {
          router.push("/login");
        }}
      >
        Iniciar sesión
      </AnchorBase>
    </div>
  );
};

const Title = () => {
  const router = useRouter();

  return (
    <AnchorBase
      onClick={() => {
        router.push("/");
      }}
    >
      <FontAwesomeIcon size="2x" color="white" icon={faHouseDamage} />{" "}
    </AnchorBase>
  );
};

export default function GeneralNav() {
  return (
    <div className={styles.container}>
      <PageHeader title={<Title />} extra={<Extra />} />
    </div>
  );
}
