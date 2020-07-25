import Head from "next/head";
import React from "react";

export default () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <nav>
        <h2 id="mainmenulabel" className="visuallyhidden">
          React Form
        </h2>
        <ul>
          <li>
            <a href="/">Basic Form example</a>
          </li>
          <li>
            <a href="/login">Simple Login example</a>
          </li>
          <li>
            <a href="/complex-form">Complex Form</a>
          </li>
          <li>
            <a href="/multi-docs-upload">Multiple Documents Upload</a>
          </li>
          <li>
            <a href="/component-builder">Component Builder</a>
          </li>
        </ul>
      </nav>
    </>
  );
};
