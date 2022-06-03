import React, { useState, useContext } from "react";
import { Spin } from "antd";

const LoaderContext = React.createContext({
  loading: false,
  handleLoading: (_: boolean): void => {},
});

export const useLoader = () => {
  return useContext(LoaderContext);
};

export default function withLoader<P>(
  WrappedComponent: React.ComponentType<P>
) {
  const ComponentWithLoader = (props: P) => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleLoading = (isLoading: boolean) => {
      setLoading(isLoading);
    };

    return (
      <Spin spinning={loading}>
        <LoaderContext.Provider value={{ loading, handleLoading }}>
          <WrappedComponent {...props} />
        </LoaderContext.Provider>
      </Spin>
    );
  };
  return ComponentWithLoader;
}
