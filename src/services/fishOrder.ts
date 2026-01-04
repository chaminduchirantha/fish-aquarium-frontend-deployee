import api from "./api"

type OrderFishList = {
    email :string
    firstname : string 
    lastname : string
    address : string
    paymentmethod : string
    amount : string
    orderType :string
    orderDate : string
    fishname : string
    price : string
    qty : number
    status: string;
}

export const fishOrderSave = async (data: OrderFishList) => {
  const res = await api.post("/orders/createOrders", data)
  return res.data
}

export const getAllFishOrder = async (page: number, limit: number) => {
  const res = await api.get(`/orders/allOrders?page=${page}&limit=${limit}`);
  return res.data;
};

export const updateFishOrderStatus = async (id: string, status: string) => {
  const res = await api.put(`/orders/updateStatus/${id}`, { status });
  return res.data;
};


export const getUserOrders = async (email: string) => {
  const res = await api.get(`/orders/viewOrder/${email}`);
  return res.data;
};