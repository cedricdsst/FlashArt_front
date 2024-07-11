import axios from 'axios';

import { apiUrl } from '@/config';

interface Tag {
  _id?: string;
  name: string;
}

export const createTag = async (tag: Tag) => {
  const response = await axios.post(`${apiUrl}/tag`, tag);
  return response.data;
};

export const getAllTags = async () => {
  const response = await axios.get(`${apiUrl}/tag`);
  return response.data;
};

export const getTagById = async (id: string) => {
  const response = await axios.get(`${apiUrl}/tag/${id}`);
  return response.data;
};

export const updateTagById = async (id: string, tag: Tag) => {
  const response = await axios.put(`${apiUrl}/tag/${id}`, tag);
  return response.data;
};

export const deleteTagById = async (id: string) => {
  const response = await axios.delete(`${apiUrl}/tag/${id}`);
  return response.data;
};
