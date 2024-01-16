export {default as Hotels} from '../image/hotel.png';
export {default as Restaurants} from '../image/camp.png';
export {default as Attractions} from '../image/forest.png';

export const DayTime = [ 'Day1', 'Day2', 'Day3', 'Day4'];
export const PlanType = [ 'My Draft', 'My Travel Plan'];

export const Plcaelat = [{
  'latitude': 37.78825,
  'longitude': -122.4324,
  'latitudeDelta': 0.1,
  'longitudeDelta': 0.1,
  'title': 'PlaceA'
},
{"latitude": 37.80201958608362, "latitudeDelta": 0.013563803720330725, "longitude": -122.44858229532838, "longitudeDelta": 0.01716647297141094, 'title': 'PlaceB'},
{"latitude": 37.78894577400723, "latitudeDelta": 0.013566204272528637, "longitude": -122.45118169113994, "longitudeDelta": 0.017166472971453572, 'title': 'PlaceC'},
{"latitude": 37.76517930317627, "latitudeDelta": 0.01357056635144005, "longitude": -122.43440782651305, "longitudeDelta": 0.01716647297142515, 'title': 'PlaceD'}
];


export const EstimatedBudgetData = [
    {
      type: "Transportation",
      icon: 'directions-car-filled',
      color: '#0B646B',
      data: [
        { category: "Taxi", budget: 150 },
        { category: "Rental Car", budget: 230 },
        { category: "Public Bus", budget: 140 },
      ],
    },
    {
      type: "Accommodation",
      icon: 'house',
      color : '#9BB8CD',
      data: [
        { category: "Hotel", budget: 120 },
        { category: "Airbnb", budget: 110 },
        { category: "Vacation Rental", budget: 110 },
      ],
    },
    {
      type: "Food",
      icon: 'local-restaurant',
      color : '#FFC47E',
      data: [
        { category: "Budget", budget: "5-10" },
        { category: "Street Food", budget: "5-10" },
        { category: "Local Restaurant", budget: "10-20" },
      ],
    },
    {
      type: "Activities",
      icon: 'hiking',
      color : '#31304D',
      data: [
        { category: "Entrance Fee for Museum", budget: "10-20" },
        { category: "Boat Tour", budget: 150 },
        { category: "Night Club", budget: 30 },
      ],
    },
  ];

export const featured ={
    id: 1,
    title: 'Osaka Castle',
    description : 'Osaka Castle is a Japanese castle in Chūō-ku, Osaka, Japan. The castle is one of Japan\'s most famous landmarks and it played a major role in the unification of Japan during the sixteenth century of the Azuchi-Momoyama period.',
}


export const weather =[
  {id: 1,
  title: 'Sunny',
  name:'sun',
  color: 'yellow'
  },
  {id: 2,
    title: 'Cloudy',
    name:'cloud-sun',
    color:'grey'
    },
    {id: 3,
      title: 'little rainy',
      name:'cloud-sun-rain',
      color:'brown'
      },
      {id:4,
        title: 'little rainy',
        name:'cloud-sun-rain',
        color:'grey'
        },
]
  



export const sortCategoryData = ['All', 'Popular', 'Recommended', 'More'];

export const categoriesData = [
    {
        title: 'Ocean',
        image: require('../image/Ocean.png')
    },
    {
        title: 'Mountain',
        image: require('../image/mountain.png')
    },
    {
        title: 'Camp',
        image: require('../image/camp.png')
    },
    {
        title: 'Sunset',
        image: require('../image/sunset.png')
    },
    {
        title: 'Hiking',
        image: require('../image/hiking.png')
    },
    {
        title: 'Beach',
        image: require('../image/beach.png')
    },
    {
        title: 'Forest',
        image: require('../image/forest.png')
    },
    
]
export const destinationData = [
    {
        id: 1,
        title: 'Osaka Castle',
        rating: 4.5,
        duration: '12 Days',
        distance: '400 KM',
        weather: '20 C',
        price: 1200,
        shortDescription: "Osaka Castle is a Japanese castle in Chūō-ku, Osaka, Japan. The castle is one of Japan's most famous landmarks.",
        longDescription: "Osaka Castle is a Japanese castle in Chūō-ku, Osaka, Japan. The castle is one of Japan's most famous landmarks and it played a major role in the unification of Japan during the sixteenth century of the Azuchi-Momoyama period.",
        image: require('../image/hotel.png')
    },
    {
        id: 2,
        title: 'Island Itsukushima Shrine',
        rating: 5,

        duration: '7 Days',
        distance: '450 KM',
        weather: '30 C',
        price: 3000,
        shortDescription: "The Itsukushima shrine is one of Japan's most popular tourist attractions.",
        longDescription: "Itsukushima Shrine is a Shinto shrine on the island of Itsukushima, best known for its 'floating' torii gate. It is in the city of Hatsukaichi in Hiroshima Prefecture in Japan, accessible from the mainland by ferry at Miyajimaguchi Station.",
        image: require('../image/island.png')
    },
    
    {
        id: 3,
        rating: 3,

        title: 'Babusar Top',
        duration: '5 Days',
        distance: '299 KM',
        weather: '14 C',
        price: 1000,
        shortDescription: "Babusar Top is a mountain pass in Pakistan at the north of the 150 km long in beautiful Kaghan Valley",
        longDescription: "Babusar Pass or Babusar Top is a mountain pass in Pakistan at the north of the 150 km long Kaghan Valley, connecting it via the Thak Nala with Chilas on the Karakoram Highway. It is the highest point in Kaghan Valley that can be easily accessed by cars.",
        image: require('../image/camp.png')
    },
    {
        id: 4,
        rating: 4.5,
        title: 'Todaiji Temple',
        duration: '20 Days',
        distance: '604 KM',
        weather: '34 C',
        price: 400,
        shortDescription: "Todaiji is one of Japan's most famous and significant temples and a landmark of Nara.",
        longDescription: "Tōdai-ji is a Buddhist temple complex that was once one of the powerful Seven Great Temples, located in the city of Nara, Japan. Though it was originally founded in the year 738 CE, Tōdai-ji was not opened until the year 752 CE.",
        image: require('../image/forest.png')
    },
]