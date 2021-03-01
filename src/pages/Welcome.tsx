import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Timeline ,Image} from 'antd';



export default (): React.ReactNode => {

  return (
    <PageContainer>
      <Card>
        <Timeline>
          <Timeline.Item>当一个女孩向你倾诉她的烦恼，那不是抱怨，那是她对你的信任。</Timeline.Item>
          <Timeline.Item>喜欢记忆中，你拥抱我的温度。喜欢记忆中，你体贴的话语。喜欢记忆中，你给我依靠的肩膀……</Timeline.Item>
          <Timeline.Item>有一天，我们一起起床，一起刷牙，一起拉着手出家门。一起遛狗，一起散步，一起为了争电视斗智斗勇。一起买菜，一起做饭，一起为了几毛钱在菜市场咆哮。我知道，一定会有这么一天的。</Timeline.Item>
          <Timeline.Item>遇见，拉着你的手，无论是在哪里，我都感觉像是朝天堂奔跑，你相信么？</Timeline.Item>
          <Timeline.Item>我爱你，不仅仅是一句甜言蜜语，我愿意用行动来证明。“亲爱的，坐稳了！”</Timeline.Item>
          
        </Timeline>

        <Image
      width={200}
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    />
      </Card>
    </PageContainer>
  );
};
