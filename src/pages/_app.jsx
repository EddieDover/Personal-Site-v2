import SimpleReactLightbox from "simple-react-lightbox"
import "../styles/index.css"
export const App = ({ Component, pageProps }) => <SimpleReactLightbox><Component {...pageProps} /></SimpleReactLightbox>

export default App
