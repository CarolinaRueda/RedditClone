import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    speed={1}
    width={942}
    height={120}
    viewBox='0 0 476 124'
    backgroundColor='#e5e1e1'
    foregroundColor='#7e3f8f'
    {...props}
  >
    <rect x='25' y='21' rx='3' ry='3' width='800' height='12' />
    <rect x='27' y='38' rx='3' ry='3' width='380' height='12' />
    <rect x='27' y='67' rx='3' ry='3' width='78' height='7' />
    <rect x='211' y='67' rx='3' ry='3' width='78' height='7' />
    <rect x='402' y='68' rx='0' ry='0' width='22' height='10' />
    <circle cx='8' cy='42' r='7' />
    <rect x='2' y='18' rx='0' ry='0' width='13' height='14' />
    <rect x='2' y='53' rx='0' ry='0' width='13' height='14' />
  </ContentLoader>
);

export default MyLoader;
