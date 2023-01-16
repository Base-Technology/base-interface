import { SettingOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { KeyboardEvent, useState } from "react";
import { WayConversationItem, WayID, WayMessageItem } from "@way-network/way-im/dist/types";
import { HandlerResponse, ReactiveState } from ".";
import DetailItem from "./DetailItem";
import HeadImg from "./HeadImg";

type ChatFeedProps = {
    msgList: WayMessageItem[]
    handleSendMsg: (content: string, receiver: WayID) => Promise<HandlerResponse>
    curCve: WayConversationItem
}

export default function ChatFeed({ msgList, handleSendMsg, curCve }: ChatFeedProps) {
    //good questions: should i fetch msg list here, or fetch it outside 
    //console.log("inside chatfeed")
    console.log(msgList)
    const [text, setText] = useState("")
    const [twoHeight, settwoHeight] = useState(false);
    const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            //handle sendMsg
            if (text.length == 0) {
                //don't handle empty string
                return
            }
            let res = await handleSendMsg(text, curCve.receiver)
            if (res.statusCode == 0) {
                setText("")
            } else {
                console.log(res.msg)
            }
        }
    }

    return (
        <>
            <div className='header msg_flex msg_flex_between msg_items_center msg_border_b'>
                <HeadImg id={curCve.receiver} faceUrl={curCve.faceUrl} />
                {/* <Button onClick={handleTest}>test</Button> */}
                <div><SettingOutlined /></div>
            </div>
            <div className='detail_list msg_flex msg-flex-col-reverse'>
                {
                    msgList.map((item, index) => {
                        if (item.contentType == 101) {
                            return <DetailItem key={index} msg={item} />
                        }

                    })
                }



            </div>
            <div style={{ padding: '10px' }}>
                {/* <TextArea
                    value={text}
                    onKeyDown={handleKeyDown}
                    placeholder=""
                    autoSize={{ minRows: 1, maxRows: 6 }}
                    onChange={(e) => { setText(e.target.value) }}
                /> */}
                <Input onKeyDown={handleKeyDown} value={text} onChange={(e) => { setText(e.target.value) }} style={{ height: twoHeight && '44px' || '30px', transition: 'all 0.1s' }} onFocus={() => settwoHeight(true)} onBlur={() => settwoHeight(false)} />
                <p>{text.length}/100</p>
                {/* <Button>send</Button> */}
            </div>
        </>
    )
}