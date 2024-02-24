import loader from '../components/loading.mjs';

export const apiUrl = "https://v2.api.noroff.dev/rainy-days";

export const dataAPI = async(url) => {
    loader.show(); 
    try {
        let response = await fetch(url);
        console.log("Api Called.");
        let jackets = await response.json();
        localStorage.setItem("jacketList", JSON.stringify(jackets.data));
        console.log("Jackets stored in local storage named jacketList");
    } catch (error) {
        console.error("Could not fetch data", error);
    } finally {
        loader.hide(); 
    }
}

dataAPI(apiUrl);