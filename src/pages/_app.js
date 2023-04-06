import '@/styles/globals.css'
import { AuthProvider } from '../../context/authContext';
import 'bootstrap/dist/css/bootstrap.css';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
