import { useParams } from 'react-router-dom';
import { useFetchDocFile } from '../hooks/useDoc';

export default function Doc() {
    const { id } = useParams()
    const { data, isLoading, isError } = useFetchDocFile(id);

    if (isLoading) return <p>Carregando...</p>;
    if (isError) return <p>Erro ao carregar o documento.</p>;


    return <iframe src={data} width="100%" height="100%" title="PDF"
        style={{ border: 'none', margin: 0, padding: 0, overflow: 'hidden' }} />;
};