import axios from 'axios';


export const getPlacesData = async (bl_lat, bl_lng, tr_lat, tr_lng, type) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
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


export const getResData = async (bl_lat, bl_lng, tr_lat, tr_lng) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary`,
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

export const getHotData = async (bl_lat, bl_lng, tr_lat, tr_lng) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/hotels/list-in-boundary`,
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
export const getBigCityData = async (Input) => {
  try {
    const { data: { data } } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/locations/search`,
      {
        params: {
          query: Input,
          limit: '5', // Update the limit to retrieve only five data items
          offset: '0',
          units: 'km',
          location_id: '1',
          currency: 'USD',
          sort: 'relevance',
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
};


export const getHotelData = async () => {
  const options = {
    method: 'POST',
    url: 'https://hotels4.p.rapidapi.com/properties/v2/list',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '337de8d7c5msh99e0dfd0e714de4p182b66jsn0a5d798b1e0a',
      'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
    },
    data: {
      currency: 'USD',
      eapid: 1,
      locale: 'en_US',
      destination: {
        coordinates: {
          latitude: 35.48933,
          longitude: 138.68832
        }
      },
      checkInDate: {
        day: 10,
        month: 10,
        year: 2022
      },
      checkOutDate: {
        day: 15,
        month: 10,
        year: 2022
      },
      rooms: [
        {
          adults: 2,
          children: [{ age: 5 }, { age: 7 }]
        }
      ],
      resultsStartingIndex: 0,
      resultsSize: 200,
      sort: 'PRICE_LOW_TO_HIGH',
      filters: {
        price: { max: 150, min: 100 }
      }
    }
  };

  try {
    const { data: { data } } = await axios.request(options);
    return data;
  } catch (error) {
    return null;
  }


}

