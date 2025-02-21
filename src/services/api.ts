import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers":
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
  },
});

export default api;

export const AddressData = async (cep: string) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados do CEP:', error);
    return null;
  }
};
