import Header from "../../layout/Header";
import JobContext from "../../context/jobContext";
import { useContext, useEffect } from "react";
import { useState } from "react";

export default function Statistics() {
  const [keyword, setKeyword] = useState("");

  const { getStatistics, stats } = useContext(JobContext);

  useEffect(() => {}, []);

  function submit(e) {
    e.preventDefault();
    getStatistics(keyword);
  }
  return (
    <>
      <Header />
      <div className="modalMask">
        <div className="modalWrapper">
          <div className="left">
            <div className="rightContentWrapper">
              <div className="headerWrapper">
                <h3> Get Statistics </h3>
              </div>
              <form className="form" onSubmit={submit}>
                <div className="inputWrapper">
                  <div className="inputBox">
                    <input
                      type="text"
                      placeholder="Enter Your Topic"
                      required
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="uploadButtonWrapper">
                  <button type="submit" className="uploadButton">
                    Get
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="right">
            <div className="rightContentWrapper">
              <h4>Stats of {keyword}:</h4>
              {stats && (
                <table className="table table-striped mt-4">
                  <tbody>
                    <tr>
                      <th scope="row">Total Jobs</th>
                      <td>{stats.total_offers}</td>
                    </tr>
                    <tr>
                      <th scope="row">Minimum Salary</th>
                      <td>{stats.min_salary}</td>
                    </tr>
                    <tr>
                      <th scope="row">Maximum Salary</th>
                      <td>{stats.max_salary}</td>
                    </tr>
                    <tr>
                      <th scope="row">Average Salary</th>
                      <td>{stats.avg_salary}</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
