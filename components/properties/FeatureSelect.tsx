import React from "react";
import { Radio, Form, RadioChangeEvent } from "antd";

const featureOptions = [1, 2, 3, 4, 5];

export default function FeatureSelect(props: { label: string; name: string }) {
  const { label, name } = props;
  const [size, setSize] = React.useState("default");

  const handleSizeChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };
  return (
    <>
      <Form.Item
        label={label}
        name={name}
        rules={[{ required: true, message: `Debe ingresar el número de ${label}` }]}
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
    </>
  );
}
