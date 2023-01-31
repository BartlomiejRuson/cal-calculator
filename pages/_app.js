import "../styles/globals.css";
import {UserProvider} from '../src/userContext'
import {MealProvider} from '../src/mealContext'
function MyApp({ Component, pageProps }) {
  return(
    <MealProvider>
    <UserProvider>
    <Component {...pageProps} />
    </UserProvider>
    </MealProvider>
  )

}

export default MyApp;
