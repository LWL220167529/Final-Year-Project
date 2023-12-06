import axios from 'axios';


export const getPlacesData = async () => {
    try {
       const {data : {data}} = await axios.get('https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary',
            {
                params: {
                    bl_latitude: '34.5776326',
                    tr_latitude: '36.4408483',
                    bl_longitude: '138.2991098',
                    tr_longitude: '141.2405144',
                    restaurant_tagcategory_standalone: '10591',
                    restaurant_tagcategory: '10591',
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
