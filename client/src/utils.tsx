import { toast } from "react-toastify";

export const copyToClipBoard = async (copyMe: any) => {
    try {
        await navigator.clipboard.writeText(copyMe);
        toast.success('Copied to clipboard', {
            position: "top-center",
            autoClose: 2000,
            closeOnClick: false,
        });
    } catch (err) {
        toast.error('Failed to copy', {
            position: "top-center",
            autoClose: 2000,
            closeOnClick: false,
        });
    }
};

export const removeItemsFromStorage = (keys: string[]) => {
    keys.forEach((key) => {
        localStorage.removeItem(key);
    });
}

export const getItemFromStorage = (key: string) => {
    return localStorage.getItem(key) || null;
}