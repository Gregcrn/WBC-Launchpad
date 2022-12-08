import '../styles/globals.css'
import {NavBar, Footer} from "../components/index"
import EthProvider from "../context/EthProvider"

function MyApp({ Component, pageProps }) {
  return (
    <EthProvider>
    <div>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </div>
    </EthProvider>
    )
}

export default MyApp
