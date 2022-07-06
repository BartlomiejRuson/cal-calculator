import "../styles/globals.css";
import {UserProvider} from '../src/userContext'
function MyApp({ Component, pageProps }) {
  return(
    <UserProvider>
    <Component {...pageProps} />
    </UserProvider>
  )

}

export default MyApp;
