import DefaultLayout from "../../layout/DefaultLayout";
import MainPage from "../../layout/MainPage";
import axios from "axios";

export default function Home({ data }) {
  return (
    <DefaultLayout>
      <MainPage data={data} />
    </DefaultLayout>
  );
}

export async function getServerSideProps({ query }) {
  const keyword = query.keyword || "";
  const location = query.location || "";
  const page = query.page || "1";
  const jobType = query.job_type || "";
  const experience = query.experience || "";
  const monthSalary = query.month_salary || "";

  let minSalary=''
  let maxSalary=''
  if(query.month_salary){
    const [min, max] = query.month_salary.split("-")
    minSalary = min
    maxSalary = max
  }


  const qs = `keyword=${keyword}&location=${location}&page=${page}&job_type=${jobType}&experience=${experience}
  &min_salary=${minSalary}&max_salary=${maxSalary}`;
  const { data } = await axios.get(`${process.env.API_URL}/api/offers?${qs}`);
  return {
    props: {
      data,
    },
  };
}
