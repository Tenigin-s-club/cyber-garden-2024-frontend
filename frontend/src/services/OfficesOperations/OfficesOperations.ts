import axiosInstance from "@/lib/config/ApiConfig/ApiConfig";
import { showErrorNotification } from "@/lib/helpers/notification";
import { AxiosError } from "axios";
import {
  Inventory,
  Office,
  OfficesEmployee,
  OfficesUser,
} from "./OfficesOperations.type";

export const getOfficesEmployees = async (id: number) => {
  try {
    const res = await axiosInstance.get<OfficesEmployee[]>(
      `/offices/employees/${id}`
    );
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

export const getOfficesOffices = async () => {
  try {
    const res = await axiosInstance.get<Office[]>("/offices/offices");
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};

export const getOfficesInventories = async (id: number) => {
  try {
    const res = await axiosInstance.get<Inventory[]>(
      `/offices/inventory/${id}`
    );
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};

export const addOfficesInventories = async (employee: Inventory) => {
  try {
    const res = await axiosInstance.post("/offices/employees", employee);
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};

export const getEmployeeInventory = async (id: string) => {
  try {
    const res = await axiosInstance.get<Inventory[]>(
      `/offices/employees/${id}/inventory`
    );
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};
