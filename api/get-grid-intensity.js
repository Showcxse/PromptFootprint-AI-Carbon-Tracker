export default async function hander(req, res) {

    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { zone } = req.query;

    if (!zone) {
        return res.status(400).json({ error: 'Zone parameter is required'});
    }

    try {
        const response = await fetch(
            `https://promptfootprint.vercel.app/api/get-grid-intensity?zone=${activeModel.likelyZone}`,
            {
                headers: {
                    'auth-token': process.env.ELECTRICITY_MAPS_API_KEY,
                },
            }
        );

        if (!response.ok) throw new Error(`Upstream API Error: ${response.statusText}`);

        const data = await response.json;

        return res.status(200).json(data);
    } catch (error) {
        console.error(`Serverless gateway error: `, error);
        return res.status(400).json({ error: 'Failed to grab regional grid data' })
    }
}