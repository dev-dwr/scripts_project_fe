import Header from "../../layout/Header";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "../../context/authContext";
import Link from "next/link";
import { isAuthenticated } from "../../utils/isAuthenticated";

export default function UploadCv({accessToken}) {
  const router = useRouter();
  const [cv, setCv] = React.useState(null);

  const { uploadCv, uploaded, setUploaded, user } = useContext(AuthContext);
  useEffect(() => {
    if (uploaded) {
      setUploaded(false);
      alert("Cv uploaded");
    }
  }, [uploaded]);

  function submit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("resume", cv);

    uploadCv(formData, accessToken);
  }

  function onChangeHandler(e) {
    // console.log(e.target.files[0]);
    setCv(e.target.files[0]);
  }
  console.log(user)
  return (
    <>
      <Header />
      <div className="modalMask">
        <div className="modalWrapper">
          <div className="right">
            <div className="rightContentWrapper">
              <div className="headerWrapper">
                <h3> UPLOAD CV </h3>
              </div>
              <form className="form" onSubmit={submit}>
                <div className="inputWrapper">
                  <div className="inputBox">
                    <input
                      type="file"
                      name="resume"
                      id="customFile"
                      accept="application/pdf"
                      onChange={onChangeHandler}
                      required
                    />
                  </div>
                </div>
                {user && user.cv && (
                  <>
                    <h4 className="text-center my-3">OR</h4>
                    <Link
                      href={`https://scripts-project-bucket.s3.eu-west-3.amazonaws.com/${user.cv}`}
                      legacyBehavior
                    >
                      <a
                        className="text-success text-center ml-4"
                        rel="noreferrer"
                        target="_blank"
                      >
                        <b>Download Resume</b>
                      </a>
                    </Link>
                  </>
                )}

                <div className="uploadButtonWrapper">
                  <button type="submit" className="uploadButton">
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
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
  return {
    props: {
      accessToken,
    },
  };
}
