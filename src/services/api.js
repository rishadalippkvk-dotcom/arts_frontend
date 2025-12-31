import axios from 'axios';

const API_URL = 'https://artsapibackend.vercel.app/api';

export const getPrograms = () => axios.get(`${API_URL}/programs`);
export const createProgram = (data) => axios.post(`${API_URL}/programs`, data);
export const updateProgram = (id, data) => axios.put(`${API_URL}/programs/${id}`, data);
export const deleteProgram = (id) => axios.delete(`${API_URL}/programs/${id}`);

export const getFixtures = () => axios.get(`${API_URL}/fixtures`);
export const createFixture = (data) => axios.post(`${API_URL}/fixtures`, data);
export const updateFixture = (id, data) => axios.put(`${API_URL}/fixtures/${id}`, data);
export const deleteFixture = (id) => axios.delete(`${API_URL}/fixtures/${id}`);

export const getPoints = () => axios.get(`${API_URL}/points`);
export const createPoint = (data) => axios.post(`${API_URL}/points`, data);
export const updatePoint = (id, data) => axios.put(`${API_URL}/points/${id}`, data);
export const deletePoint = (id) => axios.delete(`${API_URL}/points/${id}`);
