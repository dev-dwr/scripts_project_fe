import React from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import { useRouter } from "next/router";
export default function Search() {
  const router = useRouter()
  const [keyword, setKeyword] = React.useState("");
  const [location, setLocation] = React.useState("");

  function submit(e) {
    e.preventDefault();

    if(keyword){
        let sq = `/?keyword=${keyword}`
        if (location){
          sq = sq.concat(`&location=${location}`)
        }
        router.push(sq)
    }else{
      router.push("/")
    }
  }

  return (
    <DefaultLayout>
      <div className="modalMask">
        <div className="modalWrapper">
          <div className="right">
            <div className="rightContentWrapper">
              <div className="headerWrapper">
                <h2> SEARCH FOR OFFERS</h2>
              </div>
              <form className="form" onSubmit={submit}>
                <div className="inputWrapper">
                  <div className="inputBox">
                    <input
                      type="text"
                      placeholder="Enter Your Keyword"
                      value={keyword}
                      onChange={e => setKeyword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="inputBox">
                    <i aria-hidden className="fas fa-industry"></i>
                    <input
                      type="text"
                      placeholder="Enter City, State ..."
                      required
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="searchButtonWrapper">
                  <button type="submit" className="searchButton">
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
