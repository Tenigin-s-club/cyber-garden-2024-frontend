import axiosInstance from "@/lib/config/ApiConfig/ApiConfig";
import { showErrorNotification } from "@/lib/helpers/notification";
import { AxiosError } from "axios";
import { Inventory } from "../OfficesOperations/OfficesOperations.type";

export const addInventory = async (name: string, office_id: string) => {
  try {
    const res = await axiosInstance.post("/build/inventory", {
      name,
      office_id,
    });
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};

export const getInventories = async (id: number) => {
  try {
    const res = await axiosInstance.get<Inventory[]>(
      `/build/inventory/${id}?is_free=true`
    );
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};

export const getFreeInventories = async (id: number) => {
  try {
    const res = await axiosInstance.get<Inventory[]>(
      `/build/inventory/${id}/?is_free=true`
    );
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};

export const deleteInventory = async (id: number) => {
  try {
    const res = await axiosInstance.delete(`/build/inventory/${id}`);
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};

export const attachInventory = async (
  user_id: string,
  inventory_ids: number[]
) => {
  try {
    const res = await axiosInstance.post("/build/attach/inventory", {
      user_id,
      inventory_ids,
    });
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};

export const deleteAttachInventory = async (
  user_id: string,
  inventory_id: number
) => {
  try {
    const res = await axiosInstance.delete(
      `/build/attach/inventory/${user_id}/${inventory_id}`
    );
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};
