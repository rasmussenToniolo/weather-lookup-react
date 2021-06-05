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