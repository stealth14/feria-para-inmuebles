import React, { useState } from "react";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./PhotosPicker.module.scss";
import type { UploadProps, UploadFile } from "antd/es/upload/interface";
import { RcFile } from "antd/lib/upload";

function getBase64(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

interface PhotosPickerProps {
  fileList: UploadFile[];
  handleFileList: (fileList: UploadFile[]) => void;
  maxCount: number;
}

export default function PhotosPicker(props: PhotosPickerProps) {
  const { handleFileList, fileList, maxCount } = props;

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

  const uploadProps: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      handleFileList(newFileList);
    },
    multiple: true,
    beforeUpload: (file, selectedFileList) => {
      const uploadFiles = selectedFileList.map((file) => {
        return {
          uid: file.uid,
          name: file.name,
          originFileObj: file,
        } as UploadFile;
      });

      handleFileList([...fileList, ...uploadFiles]);

      return false;
    },
    fileList,
  };

  return (
    <div>
      <Upload
        {...uploadProps}
        accept="image/*"
        maxCount={maxCount ?? 3}
        listType="picture-card"
        onPreview={handlePreview}
      >
        {fileList?.length < maxCount && (
          <div className={styles.button}>
            <PlusOutlined className={styles.icon} />
            <div>Agregar</div>
          </div>
        )}
      </Upload>
      <Modal
        bodyStyle={{
          padding: 0,
        }}
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
