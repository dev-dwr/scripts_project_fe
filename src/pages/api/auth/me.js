import cookie from "cookie";
import axios from 'axios'

export default async function handler (req, res){
    if(req.method == "GET"){
        const myCookie = cookie.parse(req.headers.cookie || '')
        const access = myCookie.access;
        // if(!access){
        //     return res.status(401).json({error: 'Please login first'})
        // }
        try{
        const result = await axios.get(
            `${process.env.API_URL}/api/current_user`,
            {
              headers: {
                "Authorization": `Bearer ${access}`
              },
            }
          );

        if (result.data) {
            return res.status(200).json({user: result.data})
          } else {
            res.status(result.status).json({ error: "auth failed" });
          }
        } catch (er) {
          res.status(500).json({ error: "server error" });
        }
    }
}