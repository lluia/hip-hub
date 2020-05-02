import React from "react";

export default function App({ Component, pageProps }) {
  return (
    <div style={{ backgroundColor: "red" }}>
      <Component {...pageProps} />
    </div>
  );
}
