// services/tagService.ts

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/tag';

interface Tag {
  _id?: string;
  name: string;
}

export const createTag = async (tag: Tag) => {
  const response = await axios.post(`${API_URL}`, tag);
  return response.data;
};

export const getAllTags = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getTagById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateTagById = async (id: string, tag: Tag) => {
  const response = await axios.put(`${API_URL}/${id}`, tag);
  return response.data;
};

export const deleteTagById = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
