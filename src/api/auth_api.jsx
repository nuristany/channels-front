// import axios from 'axios';

// const AUTH_URL = axios.create({
//     baseURL:"http://127.0.0.1:8000",
    
// })

// export default AUTH_URL;


import axios from 'axios';

const AUTH_URL = axios.create({
    baseURL:"https://channels-backend-production.up.railway.app",
    
})

export default AUTH_URL;