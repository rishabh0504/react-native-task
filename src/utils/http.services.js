import http from "./http.utils";
const activate = data => {
    return http.post("/posts", data);
};

export default {

    activate

};