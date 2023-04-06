import cookie from "cookie";
import axios from "axios"

export default async function handler (req, res){
  if (req.method === "POST") {
    
    const { username, password } = req.body;
    try {
      const result = await axios.post(
        `${process.env.API_URL}/api/token`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (result.data) {
        res.setHeader("Set-Cookie", [
          cookie.serialize("access", result.data.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 15, //15 days
            sameSite: "lax",
            path: "/",
          }),
        ]);

        return res.status(200).json({success: true})
      } else {
        res.status(result.status).json({ error: "auth failed" });
      }
    } catch (er) {
      res.status(500).json({ error: "server error" });
    }
  }
};
