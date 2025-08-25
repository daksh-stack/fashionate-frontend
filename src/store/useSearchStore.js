import { axiosInstance } from "../lib/axios.js";
import {toast} from "react-hot-toast"
import {create} from "zustand"
import { textSearch } from "../../../backend/src/controllers/search.controller";

export const useSearchStore = create((set,get)=>({
    searchResults:[],
    isSearching:false,
    textSearch:async(query,brand,price)=>{
        set({isSearching:true})
        try {
            const res = await axiosInstance.get("/search/",{params:{q:query,brand,price}})
            set({searchResults:res.data.result})
        } catch (error) {
            toast.error(error.response?.data?.message || "Error in searching")
        }finally{
            set({isSearching:false})
        }
    }
}))