const API_WEATHER = `https://dataservice.accuweather.com/currentconditions/v1/${process.env.ACCUWEATHER_CITY_ID}?apikey=${process.env.ACCUWEATHER_API_KEY}`;

export const fetcherWeather = () =>
	fetch(API_WEATHER, {
		next: { revalidate: 300 },
		cache: "force-cache",
	}).then((res) => res.json());
