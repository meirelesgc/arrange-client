import { useParams } from 'react-router-dom';
import { Flex, Splitter, Card, Typography, Skeleton } from 'antd';

import Doc from '../components/Doc';

import Banner from '../components/banners/ArBanner';

import { useGetDetails, usePutDetails } from '../hooks/useArrange';
import { useGetMetrics, usePutMetrics } from '../hooks/useArrange';
import { useGetPatient, usePutPatient } from '../hooks/useArrange';

import DetailsTable from '../components/tables/DetailsTable'
import PatientTable from '../components/tables/PatientTable'
import MetricsTable from '../components/tables/MetricsTable'

export default function Home() {
    const { id } = useParams();

    const { data: detailsData, isLoading: detailsIsLoading } = useGetDetails(id);
    const { mutate: updateDetails } = usePutDetails();

    const { data: metricsData, isLoading: metricsIsLoading } = useGetMetrics(id);
    const { mutate: updateMetrics } = usePutMetrics();

    const { data: patientData, isLoading: patientIsLoading } = useGetPatient(id);
    const { mutate: updatePatient } = usePutPatient();

    if (detailsIsLoading || metricsIsLoading || patientIsLoading)
        return <Card style={{ padding: '20px' }}>
            <Skeleton />
        </Card>


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
                <Banner title='Dados do documento' description='Essas informações nos ajudam a organizar as tabelas posteriormente'
                    data={detailsData} mutate={updateDetails} />
                <DetailsTable output={detailsData.output} />
                <Banner title='Metricas extraidas' description='Dados médicos baseados na lista de parametros previamente cadastrados'
                    data={metricsData} mutate={updateMetrics} />
                <MetricsTable output={metricsData.output} />
                <Banner title='Dados do paciente' description='Nenhum dos dados mostrados a seguir foi compartilhado ou armazenado sem autorização'
                    data={patientData} mutate={updatePatient} />
                <PatientTable output={patientData.output} />
            </Flex>
        </Splitter.Panel>
    </Splitter>
}
