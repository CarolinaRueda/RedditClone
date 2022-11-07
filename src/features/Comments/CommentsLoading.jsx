import React from "react";
import ContentLoader from "react-content-loader";

const MyLoaderComments = (props) => (
  <ContentLoader
    speed={1}
    width={800}
    height={120}
    viewBox='0 0 800 120'
    backgroundColor='#f3f3f3'
    foregroundColor='#dec4dc'
    {...props}
  >
    <rect x='6' y='3' rx='3' ry='3' width='241' height='17' />
    <rect x='5' y='35' rx='3' ry='3' width='800' height='16' />
    <rect x='6' y='92' rx='3' ry='3' width='337' height='17' />
    <rect x='5' y='65' rx='3' ry='3' width='800' height='16' />
  </ContentLoader>
);

export default MyLoaderComments;
