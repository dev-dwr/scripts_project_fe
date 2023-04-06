import axios from "axios";

export const isAuthenticated = async (accessToken) => {
  try {
    const res = await axios.post(`${process.env.API_KEY}/api/token/verify`, {
      token: accessToken,
    });

    if (res.status == 200) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false
  }
};
