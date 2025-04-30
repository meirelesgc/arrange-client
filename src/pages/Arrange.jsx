import { useParams } from 'react-router-dom';

import { Splitter } from 'antd'

import Doc from '../components/Doc'

export default function Home() {
    const { id } = useParams();
    return <Splitter>
        <Splitter.Panel defaultSize="40%" min="20%" max="70%" >
            <Doc id={id} />
        </Splitter.Panel>
        <Splitter.Panel>

        </Splitter.Panel>
    </Splitter>
}
