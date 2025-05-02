import { useParams } from 'react-router-dom';
import { Flex, Splitter, Card, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import Doc from '../components/Doc';
import Banner from '../components/Banner';
import Details from '../components/arranges/Details'
import Metrics from '../components/arranges/Metrics'
import Patient from '../components/arranges/Patient'


export default function Home() {
    const { id } = useParams();

    return <Splitter>
        <Splitter.Panel defaultSize="40%" min="20%" max="70%">
            <Doc id={id} />
        </Splitter.Panel>
        <Splitter.Panel style={{ padding: '20px' }}>
            <Flex vertical gap={'large'}>
                <Card style={{ padding: '20px' }}>
                    <Flex vertical align="flex-start">
                        <Typography.Title level={2} strong>
                            Revisão dos dados
                        </Typography.Title>
                        <Typography.Text type="secondary" strong>
                            Confira o que foi extraído, sinalize o que não está conforme e finalize.
                        </Typography.Text>
                    </Flex>
                </Card>
                <Details /><Metrics /><Patient />
            </Flex>
        </Splitter.Panel>
    </Splitter>
}
