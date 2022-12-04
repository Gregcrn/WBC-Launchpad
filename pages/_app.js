import '../styles/globals.css'
import {NavBar, Footer} from "../components/index"

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </div>
    )
}

export default MyApp
