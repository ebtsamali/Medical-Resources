const axios = require('axios')
const suggestAddress = async (req, res) => {
    const {params: {address}} = req;

    try {
        const response = await axios({
            method: 'get',
            url: `${process.env.BING_FIND_BY_ADDRESS_URL}&addressLine=${address}&key=${process.env.BING_MAP_KEY}`,

        });
        if (response.data && response.data.resourceSets && response.data.resourceSets.length > 0 && response.data.resourceSets[0].resources) {
            // console.log(response.data.resourceSets)
            return res.status(200).send(response.data.resourceSets[0].resources);
        }
        res.status(500).end();
    } catch (e) {
        console.log(e)
        res.status(500).end();
    }

}

const calculateDistance = async (req, res) => {
    const {body: {origins, destinations}} = req;

    try {
        const response = await axios({
            method: 'get',
            url: `${process.env.BING_DISTANCE_MATRIX_URL}&origins=${origins[0]},${origins[1]}&destinations=${destinations[0]},${destinations[1]}&key=${process.env.BING_MAP_KEY}`,

        });
        if (response.data && response.data.resourceSets && response.data.resourceSets.length > 0 && response.data.resourceSets[0].resources && response.data.resourceSets[0].resources.length > 0 && response.data.resourceSets[0].resources[0].results && response.data.resourceSets[0].resources[0].results.length > 0) {
            // console.log(response.data.resourceSets[0].resources[0])
            return res.status(200).send({distance: response.data.resourceSets[0].resources[0].results[0].travelDistance});
        }
        // console.log(response.data)
        res.status(500).end();
    } catch (e) {
        console.log(e)
        res.status(500).end();
    }

}


module.exports = {
    suggestAddress,
    calculateDistance
}
