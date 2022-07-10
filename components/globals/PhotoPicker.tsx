/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./PhotoPicker.module.scss";
import type { UploadProps, UploadFile } from "antd/es/upload/interface";
import { RcFile } from "antd/lib/upload";

function getBase64(file: RcFile): Promise<string | ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

interface PhotoPickerProps extends UploadProps {
  fileList: UploadFile[];
  handleFileList: (fileList: UploadFile[]) => void;
  maxCount: number;
}

export default function PhotoPicker(props: PhotoPickerProps) {
  const { handleFileList, fileList, maxCount = 3, ...uploadProps } = props;

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = (await getBase64(file.originFileObj)) as string;
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
        {...uploadProps}
        onRemove={(file) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          handleFileList(newFileList);
        }}
        beforeUpload={(_, selectedFileList) => {
          const uploadFiles = selectedFileList.map((file) => {
            return {
              uid: file.uid,
              name: file.name,
              originFileObj: file,
            } as UploadFile;
          });

          handleFileList([...fileList, ...uploadFiles]);

          return false;
        }}
        fileList={fileList}
        accept="image/*"
        maxCount={maxCount}
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