import axios from 'axios';

const API_URL = axios.create({
    baseURL:"https://channels-backend-production.up.railway.app/",
    
})

export default API_URL;


// import axios from 'axios';

// const API_URL = axios.create({
//     baseURL:"http://127.0.0.1:8000/api",
    
// })

// export default API_URL;