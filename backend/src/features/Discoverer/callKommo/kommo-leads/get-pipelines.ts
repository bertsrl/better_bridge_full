import axios from "axios";
import { getEnv } from "PARENT_DIR/_shared/env";

const pipelinesRoute = `https://betterspeakers.kommo.com/api/v4/leads/pipelines`;

export default async function getPipelines() {
    const kommoApiToken = getEnv()['KOMMO_API_TOKEN'];
    console.log('🔍 kommoApiToken: ', kommoApiToken);

    const response = await axios.get(pipelinesRoute, {
        headers: {
            Authorization: `Bearer ${kommoApiToken}`,
            Accept: 'application/json',
        },
    });

    if (response.status !== 200) {
        console.error('Error getting pipelines:', response.data);
        return null;
    }

    const pipelinesRaw = response.data._embedded.pipelines;
    const pipelines: Record<string, string> = {};

    for (const pipeline of pipelinesRaw) { 
        const pipelineId = pipeline.id;
        const pipelineName = pipeline.name;
        pipelines[`${pipelineName}`] = pipelineId;
    }
    
    return pipelines;
}