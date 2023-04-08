import React from "react";
import Link from "next/link";
import OfferItem from "../components/offer/OfferItem";
import Pagination from "react-js-pagination";
import { useRouter } from "next/router";
import FilterComp from "../components/FilterComp";
const Home = ({ data, accessToken }) => {
  const { offers, num, num_of_el_per_page } = data;
  const router = useRouter();
  let { page = 1, keyword } = router.query;
  page = Number(page);
  let qp;
  if (typeof window !== "undefined") {
    qp = new URLSearchParams(window.location.search);
  }
  function handlePagination(currPage) {
    if (qp.has("page")) {
      qp.set("page", currPage);
    } else {
      qp.append("page", currPage);
    }
    router.push({ search: qp.toString() });
  }
  return (
    <>
      <div className="container container-fluid">
        <div className="row">
          <div className="col-xl-3 col-lg-4">
            <FilterComp />
          </div>

          <div className="col-xl-9 col-lg-8 align-items-center content-left-offset">
            <div className="my-5 d-flex justify-content-between">
              <h4 className="page-title">Jobs Offers</h4>
              <Link href="/statistics">
                <button className="btn btn-secondary">Get statistics</button>
              </Link>
              <div className="d-block">
                <Link href="/search">Go to Search</Link>
              </div>
            </div>
            {offers && offers.map((el) => <OfferItem key={el.id} offer={el} accessToken={accessToken} />)}
            {num_of_el_per_page < num && (
              <div className="d-flex justify-content-end">
              <Pagination
                activePage={page}
                itemsCountPerPage={num_of_el_per_page}
                totalItemsCount={num}
                onChange={handlePagination}
                nextPageText={"next"}
                prevPageText={"prev"}
                itemClass="page-item"
                linkClass="page-link"
              />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
