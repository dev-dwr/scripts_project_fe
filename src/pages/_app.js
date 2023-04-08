import "@/styles/globals.css";
import { AuthProvider } from "../../context/authContext";
import { JobProvider } from "../../context/jobContext";
import "bootstrap/dist/css/bootstrap.css";

export default function App({ Component, pageProps }) {
  return (
    <JobProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </JobProvider>
  );
}
