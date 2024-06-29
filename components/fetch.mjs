import { showLoading, hideLoading } from '../components/loading.mjs';

export const apiUrl = "https://v2.api.noroff.dev/rainy-days";

export const dataAPI = async (url) => {
    showLoading();
    try {
        let response = await fetch(url);
        let jackets = await response.json();
        localStorage.setItem("jacketList", JSON.stringify(jackets.data));
        return jackets.data;
    } catch (error) {
        console.error("Could not fetch data", error);
        return null;
    } finally {
        hideLoading();
    }
};