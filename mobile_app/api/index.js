import axios from 'axios';


export const getPlacesData = async (bl_lat, bl_lng, tr_lat, tr_lng, type) => {
    try {
       const {data : {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
            {
                params: {
                    bl_latitude: bl_lat ? bl_lat : '34.5776326',
                    tr_latitude: tr_lat ? tr_lat : '36.4408483',
                    bl_longitude: bl_lng ? bl_lng : '138.2991098',
                    tr_longitude: tr_lng ? tr_lng : '141.2405144',
                    limit: '30',
                    currency: 'USD',
                    lunit: 'km',
                    lang: 'en_US'
                  },
                  headers: {
                    'X-RapidAPI-Key': '337de8d7c5msh99e0dfd0e714de4p182b66jsn0a5d798b1e0a',
                    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
                  }
            }
        );
        return data;
    } catch (error) {
        return null;
    }
}
