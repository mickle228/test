import {apiService} from "./apiService";
import {urls} from "../constants/urls";
import {IRes} from "../types/responseType";
import {IPost} from "../interfaces/postInterface";

const  postService = {
    getAll:():IRes<IPost[]>=> apiService(urls.posts.base),
    getById:(id:number):IRes<IPost> => apiService(urls.posts.byId(id))
}
export {
    postService
}