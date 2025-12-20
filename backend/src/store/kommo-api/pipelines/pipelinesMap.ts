import getPipelines from '../get-pipelines';

export async function getPipelinesMap() { 
    const pipelinesResponse = await getPipelines();

    const pipelines = pipelinesResponse._embedded.pipelines;
    return {
        'INSCRIERI': pipelines.find(field => field.name === 'INSCRIERI')?.id,
        'DEMOs': pipelines.find(field => field.name === 'DEMOs')?.id,
        'BACKLOG': pipelines.find(field => field.name === 'BACKLOG')?.id,
    };
}