import { View } from "@showtime-xyz/universal.view";
import { breakpoints } from "design-system/theme";
import { useEffect } from "react";
import {
  useWindowDimensions,
  Platform,
} from "react-native";

import React, { useState } from "react";
import ReactDatamaps from "react-india-states-map";
import { Text } from "@showtime-xyz/universal.text";
import { DistrictDropDown } from "app/components/header/DistrictDropdown";

const defaultSelected = {
  data: {},
  name: ""
};


const availableDistrictsTelangana = [
  { "locale": "ADL", "name": "Adilabad" },
  { "locale": "BHK", "name": "Bhadradri Kothagudem" },
  { "locale": "HYD", "name": "Hyderabad" },
  { "locale": "JGT", "name": "Jagtial" },
  { "locale": "JNG", "name": "Jangaon" },
  { "locale": "JYR", "name": "Jayashankar Bhupalpally" },
  { "locale": "KMR", "name": "Kamareddy" },
  { "locale": "KRM", "name": "Karimnagar" },
  { "locale": "KGT", "name": "Khammam" },
  { "locale": "KML", "name": "Kumuram Bheem" },
  { "locale": "MHB", "name": "Mahabubabad" },
  { "locale": "MBN", "name": "Mahabubnagar" },
  { "locale": "MDK", "name": "Mancherial" },
  { "locale": "MDL", "name": "Medak" },
  { "locale": "MDG", "name": "Medchal–Malkajgiri" },
  { "locale": "MLG", "name": "Mulugu" },
  { "locale": "NGR", "name": "Nagarkurnool" },
  { "locale": "NLG", "name": "Nalgonda" },
  { "locale": "NRM", "name": "Narayanpet" },
  { "locale": "NZB", "name": "Nizamabad" },
  { "locale": "PTG", "name": "Peddapalli" },
  { "locale": "RNG", "name": "Rajanna Sircilla" },
  { "locale": "RRD", "name": "Ranga Reddy" },
  { "locale": "SGR", "name": "Sangareddy" },
  { "locale": "SDD", "name": "Siddipet" },
  { "locale": "SRP", "name": "Suryapet" },
  { "locale": "VKM", "name": "Vikarabad" },
  { "locale": "WGL", "name": "Warangal" },
  { "locale": "YDR", "name": "Yadadri Bhuvanagiri" },
];

const availableDistrictsTamilNadu = [
  { "locale": "CBE", "name": "Coimbatore" },
  { "locale": "CHN", "name": "Chennai" },
  { "locale": "MDU", "name": "Madurai" },
  { "locale": "TJN", "name": "Tiruchirappalli" },
  { "locale": "TNY", "name": "Thanjavur" },
  { "locale": "ERD", "name": "Erode" },
  { "locale": "SLM", "name": "Salem" },
  { "locale": "TVM", "name": "Thiruvannamalai" },
  { "locale": "VLR", "name": "Vellore" },
  { "locale": "TUT", "name": "Thoothukudi" },
  { "locale": "DGP", "name": "Dindigul" },
  { "locale": "KRI", "name": "Krishnagiri" },
  { "locale": "NGP", "name": "Nagapattinam" },
  { "locale": "NVL", "name": "Namakkal" },
  { "locale": "PDK", "name": "Pudukkottai" },
  { "locale": "RMD", "name": "Ramanathapuram" },
  { "locale": "SKK", "name": "Sivaganga" },
  { "locale": "TPR", "name": "Tiruppur" },
  { "locale": "TRN", "name": "Tirunelveli" },
  { "locale": "VNR", "name": "Virudhunagar" },
  { "locale": "KNC", "name": "Kancheepuram" },
  { "locale": "TVC", "name": "Tiruvallur" },
  { "locale": "KGI", "name": "Kallakurichi" },
  { "locale": "CUD", "name": "Cuddalore" },
  { "locale": "ARI", "name": "Ariyalur" },
  { "locale": "TNC", "name": "Tenkasi" },
  { "locale": "CHD", "name": "Chengalpattu" },
  { "locale": "TIR", "name": "Tirupathur" },
  { "locale": "RNP", "name": "Ranipet" },
  { "locale": "VLP", "name": "Viluppuram" },
  // Note: The list of districts can vary as new districts are created or existing ones are reorganized.
];


export const availableStates = [
  { "locale": "AP", "name": "Andhra Pradesh" },
  { "locale": "AR", "name": "Arunachal Pradesh" },
  { "locale": "AS", "name": "Assam" },
  { "locale": "BR", "name": "Bihar" },
  { "locale": "CG", "name": "Chhattisgarh" },
  { "locale": "GA", "name": "Goa" },
  { "locale": "GJ", "name": "Gujarat" },
  { "locale": "HR", "name": "Haryana" },
  { "locale": "HP", "name": "Himachal Pradesh" },
  { "locale": "JK", "name": "Jammu and Kashmir" },
  { "locale": "JH", "name": "Jharkhand" },
  { "locale": "KA", "name": "Karnataka" },
  { "locale": "KL", "name": "Kerala" },
  { "locale": "MP", "name": "Madhya Pradesh" },
  { "locale": "MH", "name": "Maharashtra" },
  { "locale": "MN", "name": "Manipur" },
  { "locale": "ML", "name": "Meghalaya" },
  { "locale": "MZ", "name": "Mizoram" },
  { "locale": "NL", "name": "Nagaland" },
  { "locale": "OD", "name": "Odisha" },
  { "locale": "PB", "name": "Punjab" },
  { "locale": "RJ", "name": "Rajasthan" },
  { "locale": "SK", "name": "Sikkim" },
  { "locale": "TN", "name": "Tamil Nadu", availableDistricts: availableDistrictsTamilNadu },
  { "locale": "TS", "name": "Telangana", availableDistricts: availableDistrictsTelangana },
  { "locale": "TR", "name": "Tripura" },
  { "locale": "UP", "name": "Uttar Pradesh" },
  { "locale": "UK", "name": "Uttarakhand" },
  { "locale": "WB", "name": "West Bengal" },
  // Union Territories
  { "locale": "AN", "name": "Andaman and Nicobar Islands" },
  { "locale": "CH", "name": "Chandigarh" },
  { "locale": "DN", "name": "Dadra and Nagar Haveli and Daman and Diu" },
  { "locale": "DL", "name": "Delhi" },
  { "locale": "LD", "name": "Lakshadweep" },
  { "locale": "PY", "name": "Puducherry" },
  { "locale": "LA", "name": "Ladakh" },
];

export const LocationSelector = ({ handleChange }: any) => {

  const [activeState, setactiveState] = useState<any>(defaultSelected);
  const [activeDistrict, setactiveDistrict] = useState<any>('');
  const [stateLists, setStateLists] = useState([]);
  const [isValidDistrict, setIsValidDistrict] = useState(false);
  const [isValidState, setIsValidState] = useState(false);

  const stateOnClick = (data, name) => {
    setactiveState({ data, name });
    setIsValidState(true);
    setIsValidDistrict(false);
    setactiveDistrict('unknown');
  };

  const handleChangeDistrict = (data) => {
    if (data !== 'unknown' && data !== '') {
      setIsValidDistrict(true);
      setactiveDistrict(data);
    } else {
      setactiveDistrict('unknown');
      setIsValidDistrict(false);
    }
  };

  useEffect(() => {
    handleChange({ isValidState, isValidDistrict, activeDistrict, activeState });
  }, [isValidState, isValidDistrict]);

  const { width } = useWindowDimensions();
  const isMdWidth = width >= breakpoints["md"];
  const imageWidth = isMdWidth ? 300 : width - 32;
  const imageHeight =
    imageWidth * (475.5 / 390) - (Platform.OS === "web" ? 90 : 0);
  const title = 'District';

  return (
    <>
      <View tw=" web:self-center select-none items-center justify-center pt-0">
        <View>
          <View tw="mb-0 mt-0 rounded-xl border border-gray-200 bg-slate-50 p-0 dark:border-gray-700 dark:bg-gray-900">
            <View
              style={{
                width: imageWidth,
                height: imageHeight - 20,
              }}
              tw="mb-2 items-center overflow-hidden rounded-3xl"
            >
              <ReactDatamaps
                // regionData={stateLists}
                mapLayout={{
                  noDataColor: (true) ? "#f5f5f5" : "#f24f22",
                  borderColor: "#A6509F",
                }}
                hoverComponent={({ value }) => {
                  // An empty function to override default hover behavior
                  return null;
                }}
                onClick={stateOnClick}
                activeState={activeState}
              />
            </View>
          </View>
          {
            (activeState.name) && <>
              <View
                tw='py-2'
                style={{ backgroundColor: 'hidden', width: imageWidth, }}
              >
                <View tw="flex-row items-center justify-between pt-0 pb-0">
                  <Text tw="text-xs font-semibold text-gray-900 dark:text-gray-50">
                    You Selected: {activeState.name}
                  </Text>
                </View>

              </View>
            </>
          }
          {
            (!activeState.name) && <>
              <View tw='py-2'>
                <View tw="flex-row items-center justify-between pt-2 pb-0">
                  <Text tw="text-xs font-semibold text-gray-900 dark:text-gray-50">
                    Please Select a State before continuing
                  </Text>
                </View>
              </View>
            </>
          }
          <View
            tw='max-h-100'
            style={{ width: imageWidth, backgroundColor: activeState.name ? 'visibleBackgroundColor' : 'placeholderBackgroundColor' }}>
            <View tw="mb-0 mt-0 rounded-xl border border-gray-200 bg-slate-50 py-2 px-4 dark:border-gray-700 dark:bg-gray-900">
              {activeState.name ? (
                <>
                  <View tw="flex-row items-center justify-between">
                    <View tw="flex-1 flex-row items-center justify-between">
                      <View>
                        <Text tw="text-xs font-medium text-gray-900 dark:text-white">
                          {title}
                        </Text>
                      </View>
                      <DistrictDropDown state={activeState.name} changeDistrict={handleChangeDistrict} />
                    </View>
                  </View>
                </>
              ) : (
                <>
                  <View tw="flex-row items-center justify-between invisible">
                    <View tw="flex-1 flex-row items-center justify-between">
                      <View>
                        <Text tw="text-xs font-medium text-gray-900 dark:text-white">
                          {title}
                        </Text>
                      </View>
                      <DistrictDropDown state={activeState.name} changeDistrict={handleChangeDistrict} />
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>

          {
            !activeDistrict && (
              <View tw="flex-row items-center justify-between mt-2 pb-0">
                <Text tw="text-xs font-semibold text-gray-900 dark:text-gray-50">
                  Please Select a District before continuing
                </Text>
              </View>
            )
          }
          {
            activeDistrict && (
              <View tw="flex-row items-center justify-between mt-2 pb-0 invisible">
                <Text tw="text-xs font-semibold text-gray-900 dark:text-gray-50">
                  .
                </Text>
              </View>
            )
          }

        </View>
      </View >
    </>
  );
};
