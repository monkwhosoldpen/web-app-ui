import * as React from "react";

import Svg, { SvgProps, Path } from "react-native-svg";

const SvgSpotify = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M12 2.4c-5.302 0-9.6 4.298-9.6 9.6a9.6 9.6 0 0 0 9.6 9.6 9.6 9.6 0 0 0 9.6-9.6A9.6 9.6 0 0 0 12 2.4Zm4.402 13.846a.598.598 0 0 1-.823.198c-2.254-1.376-5.091-1.688-8.433-.925a.599.599 0 0 1-.266-1.167c3.657-.836 6.794-.476 9.324 1.07a.598.598 0 0 1 .198.824Zm1.175-2.614a.748.748 0 0 1-1.029.247c-2.58-1.587-6.514-2.046-9.566-1.12a.75.75 0 0 1-.435-1.432c3.486-1.058 7.82-.545 10.784 1.276a.748.748 0 0 1 .247 1.029Zm.101-2.722C14.584 9.072 9.48 8.903 6.526 9.8a.898.898 0 1 1-.522-1.719c3.391-1.03 9.029-.83 12.59 1.284a.897.897 0 1 1-.916 1.545Z"
      fill={props.color}
    />
  </Svg>
);

export default SvgSpotify;