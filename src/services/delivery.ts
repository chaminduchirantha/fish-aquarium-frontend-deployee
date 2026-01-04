import api from "./api"

type DeliveryData = {
    customername : string
    phonenumber : string
    email : string
    address : string
    city : string
    deliveryDate : string
    deliveryTime : string
    postelCode : string
}

export const deliverySave = async (data: DeliveryData) => {
  const res = await api.post("/delivery/create", data)
  return res.data
}


export const getAllDelivery = async (page: number, limit: number) => {
  const res = await api.get(`/delivery/allDelivery?page=${page}&limit=${limit}`);
  return res.data;
};
