import { useState, useEffect } from "react";
import { Button, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import style from "./index.less";
import { PlusOutlined } from "@ant-design/icons";

const UploadHeader = ({ value = {}, onChange }: any) => {
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);
    const [img, setImg] = useState();
    const onChangeFile = ({ fileList: newFileList }: any) => {
        setFileList(newFileList);

        newFileList.length > 0 && onPreview(newFileList[0]);
    };
    const onPreview = async (file: any) => {
        debugger;
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        setImg(src);
        onChange(src);
        // const image = new Image();
        // image.src = src;
        // const imgWindow = window.open(src);
        // imgWindow?.document.write(image.outerHTML);
    };
    const triggerChange = (changedValue: any) => {
        onChange?.({
            number,
            currency,
            ...value,
            ...changedValue,
        });
    };
    useEffect(() => {
        console.log('fileList', fileList);
    }, [fileList]);
    return (
        <div className="flex flex-align-end">
            <div className={style.uploadHeader}>
                <ImgCrop showGrid rotationSlider>
                    <Upload
                        // listType="picture-card"
                        showUploadList={false}
                        // fileList={fileList}
                        onChange={onChangeFile}
                        maxCount={1}
                    >
                        {img && <img style={{ width: '100%' }} src={img} /> || <div className={style.up}>
                            <PlusOutlined />
                        </div>}


                    </Upload>
                </ImgCrop>
            </div>

        </div>

    );
};

export default UploadHeader;