import Header from "../../layout/Header";
import axios from "axios";
import { isAuthenticated } from "../../utils/isAuthenticated";
import DataTable from "react-data-table-component";
import Link from "next/link";
import Footer from "../../layout/Footer";

export default function Applied({ offers }) {
  const columns = [
    {
      name: "Job name",
      sortable: true,
      selector: (row) => row.title,
    },
    {
      name: "Salary",
      sortable: true,
      selector: (row) => row.salary,
    },
    {
      name: "Experience",
      sortable: true,
      selector: (row) => row.experience,
    },
    {
      name: "Applied At",
      sortable: true,
      selector: (row) => row.appliedOn,
    },
    {
      name: "Action",
      sortable: true,
      selector: (row) => row.action,
    },
  ];

  const data = [];
  offers &&
    offers.forEach((element) => {
      console.log(element);
      data.push({
        title: element.offer.title,
        salary: element.offer.month_salary,
        experience: element.offer.experience,
        appliedOn: element.applied_at.substring(0, 10),
        action: (
          <Link href={`/offer/${element.offer.id}`} legacyBehavior>
            <a> view </a>
          </Link>
        ),
      });
    });

  return (
    <>
      <Header />
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8 mt-5">
          <h4 className="my-5">Applied Jobs</h4>
          <DataTable columns={columns} data={data} />
        </div>
        <div className="col-2"></div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const accessToken = req.cookies.access;
  const user = await isAuthenticated(accessToken);
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const res = await axios.get(
    `${process.env.API_URL}/api/current_user/offers`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return {
    props: {
      accessToken,
      offers: res.data,
    },
  };
}
