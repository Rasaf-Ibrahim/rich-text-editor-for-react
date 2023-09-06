{/* import */}
import React from 'react'
import './index.css'


{/* functional component */}
export default function MyApp({ Component, pageProps }) {
  return (
    <main>
        <Component {...pageProps} />
    </main>
  )
}