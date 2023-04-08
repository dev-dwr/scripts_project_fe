import Header from "../../../../layout/Header";
import { isAuthenticated } from "../../../../utils/isAuthenticated";
import { useEffect, useState } from "react";
import { useContext } from "react";
import JobContext from "../../../../context/jobContext";
import axios from "axios";

const JOB_TYPES = ["Permanent", "Internship", "Temporary"];
const INDUSTRIES = [
  "Finance",
  "Banking",
  "Education",
  "Telecommunication",
  "Information Technology",
];
const EXPERIENCE = ["No Experience", "1 Year", "2 Years"];
export default function UpdateOffer({ accessToken, offer }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [jobType, setJobType] = useState("Permanent");
  const [industry, setIndustry] = useState("Finance");
  const [experience, setExperience] = useState("No Experience");
  const [salary, setSalary] = useState("");
  const [company, setCompany] = useState("");

  const { error, updateExistingOffer, updated, setUpdated } =
    useContext(JobContext);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
    if (offer) {
      setTitle(offer.title);
      setDescription(offer.description);
      setEmail(offer.email);
      setAddress(offer.address);
      setJobType(offer.job_type);
      setIndustry(offer.industry);
      setExperience(offer.experience);
      setSalary(offer.month_salary);
      setCompany(offer.company);
      setUpdated(true)
    }
  }, [error, updated]);

  console.log(offer);
  const submit = (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
      email,
      address,
      job_type: jobType,
      industry,
      experience,
      month_salary: salary,
      company,
    };
    updateExistingOffer(offer.id, data, accessToken);
    if(updated) alert("offer has been updated");
  };
  return (
    <>
      <Header />
      <div className="newJobcontainer">
        <div className="formWrapper">
          <div className="headerWrapper">
            <h1>Update an offer</h1>
          </div>
          <form className="form" onSubmit={submit}>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="inputWrapper">
                  <div className="inputBox">
                    <input
                      type="text"
                      placeholder="Enter Job Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="inputBox">
                    <textarea
                      className="description"
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter Job Description"
                      required
                    />
                  </div>
                  <div className="inputBox">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Your Email"
                      pattern="\S+@\S+\.\S+"
                      title="Your email is invalid"
                      required
                    />
                  </div>
                  <div className="inputBox">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter Address"
                      required
                    />
                  </div>
                  <div className="inputBox">
                    <input
                      type="number"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      placeholder="Enter Salary Range"
                      required
                    />
                  </div>

                  <div className="inputBox">
                    <input
                      type="text"
                      placeholder="Enter Company Name"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 ml-4 mt-4 mt-md-0 ml-md-0">
                <div className="boxWrapper">
                  <h4>Job Types:</h4>
                  <div className="selectWrapper">
                    <select
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                      className="classic"
                    >
                      {JOB_TYPES.map((el) => (
                        <option key={el} value={el}>
                          {el}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="boxWrapper">
                  <h4>Industry:</h4>
                  <div className="selectWrapper">
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="classic"
                    >
                      {INDUSTRIES.map((el) => (
                        <option key={el} value={el}>
                          {el}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="boxWrapper">
                  <h4>Experience:</h4>
                  <div
                    className="selectWrapper"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  >
                    <select className="classic">
                      {EXPERIENCE.map((el) => (
                        <option key={el} value={el}>
                          {el}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="col text-center mt-3">
                <button className="createButton">Update Job</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req, params }) {
  const accessToken = req.cookies.access || "";
  const user = await isAuthenticated(accessToken);
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const re = await axios.get(
    `${process.env.API_URL}/api/offer/${params.id}/candidates`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  console.log(re.data);
  return {
    props: {
      accessToken,
      offer: re.data[0].offer,
    },
  };
}
