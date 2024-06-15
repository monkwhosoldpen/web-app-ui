import * as React from "react";

import Svg, { SvgProps, Path } from "react-native-svg";

const SvgRaffleHorizontal = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M22.327 6.023c.2.07.4.07.6 0 .54-.082.897.124 1.071.62V9.72a.953.953 0 0 1-.412.531c-.36.026-.71.097-1.052.212-1.097.613-1.347 1.45-.75 2.512.277.346.64.57 1.089.673.419-.05.757.08 1.014.39.048.078.085.16.113.247v3.078c-.114.355-.365.568-.751.637-7.506-.043-15.023-.05-22.552-.021-.363-.072-.595-.279-.695-.62v-3.078a.888.888 0 0 1 .412-.53c.273-.063.549-.11.827-.142 1.012-.363 1.425-1.047 1.239-2.052-.17-.505-.508-.871-1.015-1.097a12.718 12.718 0 0 0-1.051-.213.954.954 0 0 1-.413-.53L0 6.638c.113-.359.363-.571.751-.637 7.194-.004 14.386.003 21.576.022Zm.075 1.415c.057.483.075.972.057 1.468-.363.165-.726.342-1.09.53-1.316.974-1.716 2.212-1.2 3.716.467.93 1.218 1.555 2.253 1.876.044.499.05 1 .02 1.504-1.821.017-3.643.022-5.465.016l-.002-9.093c1.812.006 3.62 0 5.427-.017ZM6.03 16.564l-.488-.035c-.5-.024-1.001-.024-1.502 0 0 0-.25-.024-.375 0h-.601s-.35-.024-.526 0c0 0-.674.009-1.014-.036a8.714 8.714 0 0 1 .018-1.398 12.6 12.6 0 0 0 1.127-.566c1.539-1.237 1.801-2.676.788-4.316a3.368 3.368 0 0 0-1.953-1.24c-.013-.517 0-1.036.037-1.556 4.613.036 9.245.049 13.895.038l.002 9.093c-3.138-.006-6.274-.001-9.408.016Z"
      clipRule="evenodd"
    />
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M13.64 10.55c.53.559.475 1.058-.164 1.497-.424.334-.851.663-1.282.986.152.675.336 1.345.55 2.01.054.483-.141.799-.586.948a.775.775 0 0 1-.476-.076c-.56-.4-1.12-.791-1.685-1.176L8.24 15.952c-.6.109-.941-.144-1.026-.759.188-.697.383-1.392.586-2.085a57.545 57.545 0 0 1-1.721-1.48c-.205-.6-.01-.991.585-1.175.669.02 1.334 0 1.996-.056.238-.746.507-1.48.805-2.2.438-.311.823-.254 1.154.172.268.669.5 1.351.696 2.047.657.038 1.316.051 1.978.039.124.018.24.05.348.095Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgRaffleHorizontal;