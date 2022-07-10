import React from "react";
import { PageHeader, Grid } from "antd";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHouseUser,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import AnchorBase from "./globals/AnchorBase";

import styles from "./GeneralNav.module.scss";

export default function GeneralNav() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <PageHeader>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className={styles.item} key={"1"}>
            <AnchorBase
              onClick={() => {
                router.push("/");
              }}
            >
              <FontAwesomeIcon size="2x" color="white" icon={faHouseUser} />{" "}
              <span>INICIO</span>
            </AnchorBase>
          </div>
          <div className={styles.item} key={"2"}>
            <AnchorBase
              onClick={() => {
                router.push("/login");
              }}
            >
              <FontAwesomeIcon size="2x" color="white" icon={faUser} />{" "}
              <span>ENTRAR</span>
            </AnchorBase>
          </div>
          <div className={styles.item} key={"3"}>
            <AnchorBase
              onClick={() => {
                router.push("/search");
              }}
            >
              <FontAwesomeIcon size="2x" color="white" icon={faSearch} />
              <span>BUSCAR</span>
            </AnchorBase>
          </div>
        </div>
      </PageHeader>
    </div>
  );
}
