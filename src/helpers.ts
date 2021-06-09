import { TIMEOUT_SEC } from "./config";

export const timeout = async function (sec: number) {
  return new Promise(function (_, reject) {
    setTimeout(
      () => reject(new Error(`Timedout after ${sec} seconds.`)),
      sec * 1000
    );
  });
};

export const getJSON = async function (url: string) {
  try {
    const res:any = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};

export const wait = async function (sec: number) {
  return new Promise(function (resolve, _) {
    setTimeout(resolve, sec * 1000);
  });
};

export function getDateStr(num: number) {

  const date = new Date(+`${num}000`);

  const optionsDate:any = { weekday: "long", month: "long", day: "numeric" };

  const dateStr = date.toLocaleDateString("en-US", optionsDate);
  return dateStr;
}

export function getTempC(kTemp: number) {
  return (Math.round(kTemp) - 273).toFixed();
}

