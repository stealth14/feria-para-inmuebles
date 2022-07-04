import React, { useState } from "react";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./PhotosPicker.module.scss";

function getBase64(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

interface PhotosPickerProps {
  fileList: Array<any>;
  handleChange: (fileList: any) => void;
  maxCount: number;
}

export default function PhotosPicker(props: PhotosPickerProps) {
  const { fileList, handleChange, maxCount } = props;
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  return (
    <div>
      <Upload
        accept="image/*"
        multiple
        maxCount={maxCount ?? 3}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={(file: File) => {
          const maxSize = 1048576; // 1MB
          if (file.size > maxSize) {
            alert("La imagen es muy grande");
            return Upload.LIST_IGNORE;
          }

          return true;
        }}
      >
        {fileList?.length < maxCount && (
          <div className={styles.button}>
            <PlusOutlined className={styles.icon} />
            <div>Agregar</div>
          </div>
        )}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
}
