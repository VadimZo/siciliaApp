//@ts-nocheck
import {axios} from "../core/axios";
export const Api= {
    async fetchIpGeo(){
        const city = await axios.get('https://api.allorigins.win/raw?url=https://ipinfo.io/json')
                        .then(async({data})=>{
                            const city = await axios.get(`https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=${data.ip}`,
                               {
                                        headers: {
                                            "Content-Type": "application/json",
                                            "Accept": "application/json",
                                            "Authorization": "Token "+"1c8bfaf6f2941cad3f303c45ac026e0c7e9dc6db",
                                        },
                               }
                            );
                            return city;
                        });
                if(city.data.location === (null || undefined)) return "Москва";
                return city.data.location.city;
    },
    async fetchPizzas() {
        const {data} = await axios.get('http://localhost:3001');
        return data.data;
    },
    async signIn(postData){
        const { data } = await axios.post('http://localhost:3001/sinein', {
            username: postData.phone.replace(/\s+/g,''),
            password: postData.password,
        });
        return data;
    },
    async sineUp(postData) {
        const { data } = await axios.post('http://localhost:3001/sineup', {
          phone: postData.phone.replace(/\s+/g,''),
          password: postData.password,
          password2: postData.password2,
        });
        return data;
      },
    async getMe() {
        const { data } = await axios.get('http://localhost:3001/profile');
        return data;
      },
    }
