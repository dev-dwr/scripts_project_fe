import React from "react";
import axios from "axios";
import DefaultLayout from "../../../layout/DefaultLayout";
import moment from "moment";

export default function OfferDetails({ offer, candidates_count }) {
  console.log(offer);
  return (
    <DefaultLayout>
      <div className="job-details-wrapper">
        <div className="container container-fluid">
          <div className="row">
            <div className="col-xl-9 col-lg-8">
              <div className="job-details p-3">
                <div className="job-header p-4">
                  <h2>{offer.title}</h2>
                  <span>
                    <span>{offer.company}</span>
                  </span>
                  <span className="ml-4">
                    <span>{offer.address}</span>
                  </span>

                  <div className="mt-3">
                    <span>
                      <button className="btn btn-primary px-4 py-2 apply-btn">
                        Apply Now
                      </button>
                      <span className="ml-4 d-flex flex-row-reverse text-success">
                        <b>{candidates_count ? candidates_count : 0 }</b> {" "} candidates applied:
                      </span>
                    </span>
                  </div>
                </div>

                <div className="job-description mt-5">
                  <h4>Description</h4>
                  <p>
                   {offer.description}
                  </p>
                </div>

                <div className="job-summary">
                  <h4 className="mt-5 mb-4">Job Summary</h4>
                  <table className="table table-striped">
                    <tbody>
                    <tr>
                        <td>Expected Salary</td>
                        <td>:</td>
                        <td>{offer.month_salary} zl</td>
                      </tr>

                      <tr>
                        <td>Experience</td>
                        <td>:</td>
                        <td>{offer.experience}</td>
                      </tr>

                      <tr>
                        <td>Company</td>
                        <td>:</td>
                        <td>{offer.company}</td>
                      </tr>
                      <tr>
                        <td>Job Type</td>
                        <td>:</td>
                        <td>{offer.job_type}</td>
                      </tr>

                      <tr>
                        <td>Job Industry</td>
                        <td>:</td>
                        <td>{offer.industry}</td>
                      </tr>
        
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-4">
              <div className="job-contact-details p-3">
                <h4 className="my-4">More Details</h4>
                <hr />
                <h5>Email Address:</h5>
                <p>{offer.email}</p>

                <h5>Job Posted:</h5>
                <p>  {moment
                .utc(offer.created_at)
                .local()
                .startOf("seconds")
                .fromNow()}</p>

                <h5>Expiration Date:</h5>
                <p>{offer.expiration_date}</p>
              </div>

              <div className="mt-5 p-0">
                <div className="alert alert-danger">
                  <h5>Note:</h5>
                  You can no longer apply to this job. This job is expired. Last
                  date to apply for this job was: <b>15-2-2022</b>
                  <br /> Checkout others job on Jobbee.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export async function getServerSideProps({ params }) {
  const res = await axios.get(`${process.env.API_URL}/api/offers/${params.id}`);
  return {
    props: {
      offer: res.data.offer,
      candidates_count: res.data.num_of_candidates,
    },
  };
}
