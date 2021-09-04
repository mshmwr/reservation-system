import { useTranslation } from "react-i18next";
function useConstRoomData() {
  const { t } = useTranslation();
  const ROOM_LIST = t("roomInfo.roomList", { returnObjects: true });
  const START_TIME = t("reservationPage.startTime");
  const END_TIME = t("reservationPage.endTime");
  const TIME_REGION = getTimeRegion(START_TIME, END_TIME);
  const TIME_REGION_MAPPING = getTimeRegionMapping(TIME_REGION);

  return {
    ROOM_LIST,
    START_TIME,
    END_TIME,
    TIME_REGION,
    TIME_REGION_MAPPING,
  };
}

const getTimeRegion = (startTime, endTime) => {
  let timeRegion = [];
  for (let i = startTime; i <= endTime; i++) {
    timeRegion.push(i);
  }
  return timeRegion;
};

const getTimeRegionMapping = (timeRegion) => {
  let timeMapping = [];
  timeRegion.forEach((time) => {
    timeMapping.push(`${time}L`);
    timeMapping.push(`${time}R`);
  });
  return timeMapping;
};

export default useConstRoomData;
