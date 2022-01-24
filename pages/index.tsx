/* eslint-disable @next/next/no-img-element */
import styles from "../styles/Home.module.scss";
import { Col, Row, Grid } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faDollarSign,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";

import AnchorBase from "@/components/globals/AnchorBase";
import { useRouter } from "next/router";

const { useBreakpoint } = Grid;

interface CardProps {
  title: string;
  icon: JSX.Element;
  description: string;
}

const Card = (props: CardProps) => {
  const { title, icon, description } = props;
  return (
    <div className={styles.Card}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.icon}>{icon}</div>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

const custom = { display: "flex", justifyContent: "center", marginTop: "2rem" };

export default function Home() {
  const screens = useBreakpoint();
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <Row>
          <Col span={24}>
            <h1>Feria para inmuebles</h1>
          </Col>
        </Row>
        <Row>
          <Col span={screens.xs ? 10 : 8}>
            <div className={styles.content}>
              <h2>Compra y venta de {screens.sm && "bienes"} inmuebles</h2>
              <p>Publica tus propiedades o encuentra tu propiedad ideal</p>
              <AnchorBase
                className={styles.action}
                onClick={() => {
                  router.push("/register");
                }}
              >
                Comenzar
              </AnchorBase>
            </div>
          </Col>
          <Col span={screens.xs ? 14 : 16}>
            <div className={styles.header}>
              {screens.sm ? (
                <img src="/header.png" alt="cabecera" />
              ) : (
                <img
                  style={{ maxHeight: 400 }}
                  src="/model.png"
                  alt="cabecera"
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
      <Row justify="center">
        <h2 style={{ marginTop: 20 }}>Ofrecemos</h2>
      </Row>
      <Row justify="center">
        <Col style={custom} xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <Card
            title="Buscador de inmuebles"
            icon={<FontAwesomeIcon icon={faSearch} />}
            description="Encuentra anuncios de propiedades que se ajusten a tus exigencias y presupuesto"
          />
        </Col>
        <Col style={custom} xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <Card
            title="Anuncios gratis"
            icon={<FontAwesomeIcon icon={faDollarSign} />}
            description="Puedes publicar los inmuebles que quieras para que tus compradores te encuentren fácilmente"
          />
        </Col>
        <Col style={custom} xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <Card
            title="Cero complicaciones"
            icon={<FontAwesomeIcon icon={faSmile} />}
            description="Para empezar a publicar solo necesitas registrarte. "
          />
        </Col>
      </Row>
    </div>
  );
}
