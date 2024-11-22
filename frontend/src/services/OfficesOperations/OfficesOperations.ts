import axiosInstance from "@/lib/config/ApiConfig/ApiConfig";
import { showErrorNotification } from "@/lib/helpers/notification";
import { AxiosError } from "axios";

export const getOfficesEmployees = async () => {
  try {
    const res = await axiosInstance.get("/offices/employees");
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};
