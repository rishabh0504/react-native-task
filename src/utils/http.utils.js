import axios from "axios";
// We can define base url here
export default axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    headers: {
        "Content-type": "application/json"
    }
});