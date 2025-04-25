import { Drawer as AntDrawer, Typography, Upload, Flex } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

export default function Drawer({ title, toggleDrawer, open }) {
    return <AntDrawer title={title} onClose={toggleDrawer} open={open}>
        <Dragger>
            <Flex vertical align='center'>
                <InboxOutlined className='logo' style={{ fontSize: '48px' }} />
                <Typography.Title level={5} style={{ marginTop: '10px' }}>
                    Clique ou arraste o arquivo para esta área para fazer upload
                </Typography.Title>
                <Typography.Text>
                    Suporte para upload único ou em massa.
                </Typography.Text>
            </Flex>
        </Dragger>
    </AntDrawer>
}