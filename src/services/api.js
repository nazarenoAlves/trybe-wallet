const API_URL = 'https://economia.awesomeapi.com.br/json/all';

const fetchCurrenciesApi = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

export default fetchCurrenciesApi;
