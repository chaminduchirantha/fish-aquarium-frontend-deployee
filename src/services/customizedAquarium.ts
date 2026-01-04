import api from "./api"

export const createCustomizedAquarium = async(data: any)=>{
     const res = await api.post("/aquarium/create", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  return res.data
}


export const getAllSamartAquariumDetails = async (page: number, limit: number) => {
  const res = await api.get(`/aquarium/get?page=${page}&limit=${limit}`);
  return res.data;
};