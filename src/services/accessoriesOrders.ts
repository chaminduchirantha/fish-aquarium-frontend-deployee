import api from "./api"

type OrderAccessoriesList = {
    email :string
    firstname : string 
    lastname : string
    address : string
    paymentmethod : string
    amount : string
    orderType :string
    orderDate : string
    itemname : string
    description : string
    price : string
    qty : number
    status: string
}

export const accessoriesOrderSave = async (data: OrderAccessoriesList) => {
  const res = await api.post("/ordersAccess/createOrders", data)
  return res.data
}

export const getAllAccessoriesOrder = async (page: number, limit: number) => {
  const res = await api.get(`/ordersAccess/allOrders?page=${page}&limit=${limit}`);
  return res.data;
};

export const updateAccessoriesOrderStatus = async (id: string, status: string) => {
  const res = await api.put(`/ordersAccess/updateStatus/${id}`, { status });
  return res.data;
};


export const getUserOrdersAccessories = async (email: string) => {
  const res = await api.get(`/ordersAccess/viewOrder/${email}`);
  return res.data;
};