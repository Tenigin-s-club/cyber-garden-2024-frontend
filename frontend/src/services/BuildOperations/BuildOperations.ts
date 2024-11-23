import axiosInstance from "@/lib/config/ApiConfig/ApiConfig";
import { showErrorNotification } from "@/lib/helpers/notification";
import { AxiosError } from "axios";

export const addInventory = async (name: string) => {
  try {
    const res = await axiosInstance.post("/build/inventory", { name });
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};
