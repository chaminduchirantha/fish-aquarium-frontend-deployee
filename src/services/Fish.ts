import api from "./api"

export const createFish = async(data: any)=>{
     const res = await api.post("/fish/createfish", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  return res.data
}

export const getAllFish = async (page: number, limit: number) => {
  const res = await api.get(`/fish/all?page=${page}&limit=${limit}`);
  return res.data;
};


export const updateFish = async (id: string, data: any) => {
  const res = await api.put(`/fish/updateFish/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return res.data;
};

export const searchFish = async (page: number, limit: number, category: string, search: string) => {
  const res = await api.get(`/fish/search?page=${page}&limit=${limit}&category=${category}&query=${search}`);
  return res.data;
};


export const deleteFish = async (id: string) => {
  const res = await api.delete(`/fish/deleteFish/${id}`);
  return res.data;
};