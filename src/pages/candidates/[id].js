import { isAuthenticated } from "../../../utils/isAuthenticated";
import DataTable from "react-data-table-component";
import Header from "../../../layout/Header";
import Link from "next/link";
import axios from "axios";

export default function Candidates({ candidates }) {
  const columns = [
    {
      name: "Job Name",
      sortable: true,
      selector: (row) => row.title,
    },
    {
      name: "User Id",
      sortable: true,
      selector: (row) => row.id,
    },
    {
      name: "Cv",
      sortable: true,
      selector: (row) => row.cv,
    },
    {
      name: "Applied At",
      sortable: true,
      selector: (row) => row.applied_at,
    },
  ];

  const data = [];
  candidates &&
    candidates.forEach((element) => {
      data.push({
        id: element.offer.id,
        title: element.offer.title,
        applied_at: element.applied_at.substring(0, 10),
        cv: (
          <>
            <Link
              href={`https://scripts-project-bucket.s3.eu-west-3.amazonaws.com/${element.cv}`}
              legacyBehavior
            >
              <a
                clas
                sName="text-success text-center ml-4"
                rel="noreferrer"
                target="_blank"
              >
                <b>View Resume</b>
              </a>
            </Link>
          </>
        ),
      });
    });

  return (
    <>
      <Header />
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8 mt-5">
          <h4 className="my-5">
            {candidates && `${candidates.length} candidates  applied`}
          </h4>
          <DataTable columns={columns} data={data} />
        </div>
        <div className="col-2"></div>
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
  return {
    props: {
      candidates: re.data,
      accessToken,
    },
  };
}
