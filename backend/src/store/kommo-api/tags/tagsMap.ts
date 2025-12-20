import getTags from '../get-tags';

export async function getTagsMap() { 
    const tagsResponse = await getTags();

    const tags = tagsResponse._embedded.tags;
    return {
        'PS': tags.find(field => field.name === 'PS')?.id,
        'DEBATE': tags.find(field => field.name === 'DEBATE')?.id,
        'HS': tags.find(field => field.name === 'HS')?.id,
        'MS': tags.find(field => field.name === 'MS')?.id,
        'DEMO: 11 Sep': tags.find(field => field.name === 'DEMO: 11 Sep')?.id,
        'DEMO: 12 Sep': tags.find(field => field.name === 'DEMO: 12 Sep')?.id,
        'DEMO: 18 sep': tags.find(field => field.name === 'DEMO: 18 sep')?.id,
        'DEMO: 19 sep': tags.find(field => field.name === 'DEMO: 19 sep')?.id,
        'DEMO: 2 Oct': tags.find(field => field.name === 'DEMO: 2 Oct')?.id,
        'DEMO: 3 Oct': tags.find(field => field.name === 'DEMO: 3 Oct')?.id,
        'DEMO: 9 Oct': tags.find(field => field.name === 'DEMO: 9 Oct')?.id,
        'DEMO: 10 Oct': tags.find(field => field.name === 'DEMO: 10 Oct')?.id,
        'STRIPE': tags.find(field => field.name === 'STRIPE')?.id,
    };
}