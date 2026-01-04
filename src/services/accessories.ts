import api from "./api";


export const createAccessories = async(data: any)=>{
     const res = await api.post("/accessories/createAccess", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  return res.data
}

export const getAllAccessories = async (page: number, limit: number) => {
  const res = await api.get(`/accessories/allAccess?page=${page}&limit=${limit}`);
  return res.data;
};

export const updateAccessories = async (id: string, data: any) => {
  const res = await api.put(`/accessories/updateAccess/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return res.data;
};


export const deleteAccessories = async (id: string) => {
  const res = await api.delete(`/accessories/deleteAccess/${id}`);
  return res.data;
};

export const searchAccessories = async (page: number, limit: number, category: string, search: string) => {
  const res = await api.get(`/accessories/search?page=${page}&limit=${limit}&category=${category}&query=${search}`);
  return res.data;
};
