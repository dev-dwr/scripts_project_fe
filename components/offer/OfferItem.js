import React from "react";
import Link from "next/link";
import moment from "moment";
import JobContext from "../../context/jobContext";
import { useContext } from "react";

const OfferItem = ({ offer, accessToken }) => {

  
  return (
    <Link href={`/offer/${offer.id}`} legacyBehavior>
      <a className="job-listing">
        <div className="job-listing-details">
          <div className="job-listing-description">
            <h4 className="job-listing-company">{offer.company}</h4>
            <h3 className="job-listing-title">{offer.title}</h3>
            <p className="job-listing-text">{offer.description}</p>
          </div>

          <span className="bookmark-icon"></span>
        </div>

        <div className="job-listing-footer">
          <ul>
            <li>{offer.industry}</li>

            <li>{offer.job_type}</li>
            <li>{offer.month_salary} zł</li>
            <li>
              {moment
                .utc(offer.created_at)
                .local()
                .startOf("seconds")
                .fromNow()}
            </li>
          </ul>
        </div>
      </a>
    </Link>
  );
};

export default OfferItem;
