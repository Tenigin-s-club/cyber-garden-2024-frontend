import axiosInstance from "@/lib/config/ApiConfig/ApiConfig";
import { showErrorNotification } from "@/lib/helpers/notification";
import { AxiosError } from "axios";
import { OfficesEmployee, OfficesUser } from "./OfficesOperations.type";

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
export const addOfficesEmployees = async (employee: OfficesUser) => {
  try {
    const res = await axiosInstance.post("/offices/employees", employee);
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};
export const deleteOfficesEmployees = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/offices/employees/${id}`);
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};
