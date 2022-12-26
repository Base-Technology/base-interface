import { SettingOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { WayConversationItem, WayMessageItem } from "way-sdk-test/dist/types";
import { ReactiveState } from ".";
import DetailItem from "./DetailItem";
import HeadImg from "./HeadImg";

type ChatFeedProps = {
    msgList: WayMessageItem[]
    handleSendMsg: () => void
    curCve: WayConversationItem
}

export default function ChatFeed({ msgList, handleSendMsg, curCve }: ChatFeedProps) {
    //good questions: should i fetch msg list here, or fetch it outside 
    console.log("inside chatfeed")
    console.log(msgList)
    return (
        <>
            <div className='header msg_flex msg_flex_between msg_items_center msg_border_b'>
                <HeadImg data={[]} />
                {/* <Button onClick={handleTest}>test</Button> */}
                <div><SettingOutlined /></div>
            </div>
            <div className='detail_list msg_flex msg-flex-col-reverse'>
                {/* {
                    list.map((item, index) => <DetailItem />) reverse!!
                  } */}

                <DetailItem />
                <DetailItem />
                <DetailItem />
                <DetailItem />
                <DetailItem />
                <DetailItem self />
                <DetailItem />
                <DetailItem />
                <DetailItem />
                <DetailItem />
                <DetailItem /><DetailItem self /><DetailItem self /><DetailItem self /><DetailItem self />
                <DetailItem />
                <DetailItem />
                <DetailItem />
            </div>
            <div style={{ padding: '10px' }}>
                <TextArea
                    placeholder=""
                    autoSize={{ minRows: 1, maxRows: 6 }}
                />
                {/* <Input style={{ height: twoHeight && '44px' || '30px', transition: 'all 0.1s' }} onFocus={() => settwoHeight(true)} onBlur={() => settwoHeight(false)} /> */}
                <p>0/100</p>
            </div>
        </>
    )
}