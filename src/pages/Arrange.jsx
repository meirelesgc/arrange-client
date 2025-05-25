import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Splitter, Card, Typography, Skeleton } from 'antd';

import Doc from '../components/Doc';
import Banner from '../components/banners/ArBanner';
import Table from '../components/tables/ArTable';

import { useGetDetails, usePutDetails, usePatchDetails, useGetMetrics, usePutMetrics, usePatchMetrics, useGetPatient, usePutPatient, usePatchPatient } from '../hooks/useArrange';
import configDetails from '../components/tables/table.config/Details';
import configMetrics from '../components/tables/table.config/Metrics';
import configPatient from '../components/tables/table.config/Patient';

import { toTableData } from '../utils/transform';

export default function Arrange() {
    const { id } = useParams();

    const { data: detailsData, isLoading: detailsIsLoading } = useGetDetails(id);
    const { mutate: requestDetails } = usePutDetails();
    const { mutate: patchDetails } = usePatchDetails();
    const { data: metricsData, isLoading: metricsIsLoading } = useGetMetrics(id);
    const { mutate: requestMetrics } = usePutMetrics();
    const { mutate: patchMetrics } = usePatchMetrics();
    const { data: patientData, isLoading: patientIsLoading } = useGetPatient(id);
    const { mutate: requestPatient } = usePutPatient();
    const { mutate: patchPatient } = usePatchPatient();

    const [detailsTable, setDetailsTable] = useState([]);
    const [metricsTable, setMetricsTable] = useState([]);
    const [patientTable, setPatientTable] = useState([]);

    useEffect(() => {
        if (detailsData?.output)
            setDetailsTable(toTableData(detailsData.output, ''));
    }, [detailsData]);

    useEffect(() => {
        if (metricsData?.output)
            setMetricsTable(toTableData(metricsData.output, []));
    }, [metricsData]);

    useEffect(() => {
        if (patientData?.output)
            setPatientTable(toTableData(patientData.output, ''));
    }, [patientData]);

    function saveDetails() {
        const payload = detailsTable.reduce((acc, { param, output }) => {
            acc[param] = output;
            return acc;
        }, {});
        patchDetails({ id, output: payload });
    }

    if (metricsIsLoading || patientIsLoading || detailsIsLoading)
        return <Card style={{ padding: '20px' }}>
            <Skeleton />
        </Card>

    return <Splitter>
        <Splitter.Panel defaultSize="40%" min="20%" max="70%">
            <Doc id={id} />
        </Splitter.Panel>
        <Splitter.Panel style={{ padding: '20px' }}>
            <Flex vertical gap="large">
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

                <Banner
                    title="Dados do documento"
                    description="Essas informações nos ajudam..."
                    data={detailsData}
                    mutate={requestDetails}
                    onSave={saveDetails}
                    disableSave={detailsIsLoading}
                />
                <Table
                    data={detailsTable}
                    setData={setDetailsTable}
                    isLoading={detailsIsLoading}
                    onSave={output => patchDetails({ id, output })}
                    configColumns={configDetails} />
                <Banner title="Métricas extraidas" description="Dados médicos baseados na lista de parâmetros previamente cadastrados"
                    data={metricsData} mutate={requestMetrics} />
                <Table
                    data={metricsTable}
                    setData={setMetricsTable}
                    isLoading={metricsIsLoading}
                    onSave={output => patchDetails({ id, output })}
                    validate={output =>
                        Object.values(output).some(v => v?.length > 1)
                            ? 'Cada parâmetro deve conter no máximo um valor.' : undefined
                    }
                    configColumns={configMetrics} />
                <Banner title="Dados do paciente" description="Nenhum dos dados mostrados a seguir foi compartilhado ou armazenado sem autorização"
                    data={patientData}
                    mutate={requestPatient} />
                <Table
                    data={patientTable}
                    setData={setPatientTable}
                    isLoading={patientIsLoading}
                    onSave={output => patchPatient({ id, output })}
                    configColumns={configPatient} />
            </Flex>
        </Splitter.Panel>
    </Splitter>
}