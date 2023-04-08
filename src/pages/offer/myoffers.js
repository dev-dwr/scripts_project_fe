import Header from "../../../layout/Header";
import { isAuthenticated } from "../../../utils/isAuthenticated";
import { useEffect } from "react";
import { useContext } from "react";
import JobContext from "../../../context/jobContext";
import axios from "axios";
import Link from "next/link";
import DataTable from "react-data-table-component";
import { useRouter } from "next/router";
export default function MyOffers({ accessToken, offers }) {
  const { error, created, setCreated, deleteOffer, deleted, setDeleted } =
    useContext(JobContext);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      console.error(error);
    }
    if (created) {
      setCreated(false);
      alert("offer has been created");
    }
  }, [error, created]);

  const columns = [
    {
      name: "Job Id",
      sortable: true,
      selector: (row) => row.title,
    },
    {
      name: "Job Name",
      sortable: true,
      selector: (row) => row.title,
    },
    {
      name: "Salary",
      sortable: true,
      selector: (row) => row.salary,
    },
    {
      name: "Action",
      sortable: true,
      selector: (row) => row.action,
    },
  ];

  function deleteOfferHandler(id) {
    deleteOffer(id, accessToken);
  }
  const data = [];
  offers &&
    offers.forEach((element) => {
      data.push({
        id: element.id,
        title: element.title,
        salary: element.month_salary,
        experience: element.experience,
        action: (
          <>
            <Link href={`/offer/${element.id}`} legacyBehavior>
              <a> view </a>
            </Link>
            <br />
            <Link href={`/candidates/${element.id}`} legacyBehavior>
              <a> show candidates </a>
            </Link>
            <br />
            <Link href={`candidate/${element.id}`} legacyBehavior>
              <a> update offer </a>
            </Link>
            <br />
            <a
              style={{
                color: "blue",
                cursor: "pointer"
              }}
              onClick={() => deleteOfferHandler(element.id)}
            >
              {" "}
              delete offer
            </a>
          </>
        ),
      });
    });

  useEffect(() => {
    if (deleted) {
      router.reload(router.asPath);
    }
  }, [deleted]);

  return (
    <>
      <Header />
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8 mt-5">
          <h4 className="my-5">My Offers</h4>
          <DataTable columns={columns} data={data} />
        </div>
        <div className="col-2"></div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
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
    `${process.env.API_URL}/api/current_user/all_offers`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return {
    props: {
      accessToken,
      offers: re.data,
    },
  };
}
