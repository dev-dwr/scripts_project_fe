import React from "react";
import { useRouter } from "next/router";

const FilterComp = () => {
  const router = useRouter();
  let qp;
  if (typeof window !== "undefined") {
    qp = new URLSearchParams(window.location.search);
  }

  function clickHandler(checkbox) {
    if (typeof window !== "undefined") {
      const checkboxes = document.getElementsByName(checkbox.name);
      checkboxes.forEach((el) => {
        if (el !== checkbox) el.checked = false;
      });
    }
    if (checkbox.checked == false) {
      if (qp.has(checkbox.name)) {
        qp.delete(checkbox.name);
        router.replace({
          search: qp.toString(),
        });
      }
    } else {
      if (qp.has(checkbox.name)) {
        qp.set(checkbox.name, checkbox.value);
      } else {
        qp.append(checkbox.name, checkbox.value);
      }
      router.replace({
        search: qp.toString(),
      });
    }
  }
  function checkHandler(checkboxType, checkboxValue) {
    if (typeof window !== "undefined") {
      const value = qp.get(checkboxType);
      if (checkboxValue == value) return true;
      else return false;
    }
  }
  return (
    <div className="sidebar mt-5">
      <h3>Filters</h3>

      <hr />
      <h5 className="filter-heading mb-3">Job Type</h5>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="job_type"
          id="check1"
          value="Permanent"
          defaultChecked={checkHandler("job_type", "Permanent")}
          onClick={(e) => clickHandler(e.target)}
        />
        <label className="form-check-label" htmlFor="check1">
          Permanent
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="job_type"
          id="check2"
          value="Temporary"
          defaultChecked={checkHandler("job_type", "Temporary")}
          onClick={(e) => clickHandler(e.target)}
        />
        <label className="form-check-label" htmlFor="check2">
          Temporary
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="job_type"
          id="check3"
          value="Internship"
          onClick={(e) => clickHandler(e.target)}
          defaultChecked={checkHandler("job_type", "Internship")}
        />
        <label className="form-check-label" htmlFor="check3">
          Internship
        </label>
      </div>

      <hr />
      <h5 className="mb-3">Experience</h5>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="experience"
          id="check7"
          value="No Experience"
          defaultChecked={checkHandler("experience", "No Experience")}
          onClick={(e) => clickHandler(e.target)}
        />
        <label className="form-check-label" htmlFor="check7">
          No Experience
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="experience"
          id="check8"
          value="1 Year"
          defaultChecked={checkHandler("experience", "1 Year")}
          onClick={(e) => clickHandler(e.target)}
        />
        <label className="form-check-label" htmlFor="check8">
          1 Years
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="experience"
          id="check9"
          value="2 Years"
          defaultChecked={checkHandler("experience", "2 Years")}
          onClick={(e) => clickHandler(e.target)}
        />
        <label className="form-check-label" htmlFor="check9">
          2 Years
        </label>
      </div>

      <hr />
      <h5 className="mb-3">Month Salary Range</h5>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="month_salary"
          id="check11"
          value="1-1000"
          defaultChecked={checkHandler("month_salary", "1-1000")}
          onClick={(e) => clickHandler(e.target)}
        />
        <label className="form-check-label" htmlFor="check11">
          1-1000 zl
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="month_salary"
          id="check12"
          value="1000-5000"
          defaultChecked={checkHandler("month_salary", "1000-5000")}
          onClick={(e) => clickHandler(e.target)}
        />
        <label className="form-check-label" htmlFor="check12">
          1000-5000 zl
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="salary"
          id="check13"
          value="5000-10000"
          defaultChecked={checkHandler("month_salary", "5000-10000")}
          onClick={(e) => clickHandler(e.target)}
        />
        <label className="form-check-label" htmlFor="check13">
          5000-10000 zl
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="month_salary"
          id="defaultCheck2"
          value="10000-15000"
          defaultChecked={checkHandler("month_salary", "10000-15000")}
          onClick={(e) => clickHandler(e.target)}
        />
        <label className="form-check-label" htmlFor="defaultCheck2">
          10000-15000 zl
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="month_salary"
          id="check14"
          value="15000-20000"
          defaultChecked={checkHandler("month_salary", "15000-20000")}
          onClick={(e) => clickHandler(e.target)}
        />
        <label className="form-check-label" htmlFor="check14">
          15000-20000 zl
        </label>
      </div>

      <hr />
    </div>
  );
};

export default FilterComp;
