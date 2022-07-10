import React from "react";
import { Radio, Form, RadioChangeEvent } from "antd";
import styles from "./FeatureSelect.module.scss";

const featureOptions = [1, 2, 3, 4, 5];

type align = "center" | "left";

export default function FeatureSelect(props: {
  label: string;
  name: string;
  align?: align;
  required?: boolean;
}) {
  const { label, name, align = "left", required = true } = props;
  const [size, setSize] = React.useState("default");

  const handleSizeChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };
  return (
    <div
      className={`${styles.container} ${align === "center" && styles.centered}`}
    >
      <Form.Item
        label={label}
        name={name}
        rules={
          required && [
            { required: true, message: `Debe ingresar el número de ${label}` },
          ]
        }
      >
        <Radio.Group name={name} value={size} onChange={handleSizeChange}>
          {featureOptions.map((featureOption) => {
            return (
              <Radio.Button value={featureOption} key={featureOption}>
                {featureOption}
              </Radio.Button>
            );
          })}
        </Radio.Group>
      </Form.Item>
    </div>
  );
}
