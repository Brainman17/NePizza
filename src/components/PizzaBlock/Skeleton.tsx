import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props: any) => (
  <ContentLoader
    speed={2}
    width={280}
    height={450}
    viewBox="0 0 280 490"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="134" cy="137" r="128" />
    <rect x="58" y="294" rx="9" ry="9" width="172" height="20" />
    <rect x="38" y="339" rx="10" ry="10" width="205" height="59" />
    <rect x="67" y="420" rx="10" ry="10" width="49" height="25" />
    <rect x="148" y="416" rx="10" ry="10" width="84" height="31" />
  </ContentLoader>
);

export default Skeleton;
