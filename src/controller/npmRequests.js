import { npmApi } from "@/service/npm-api";
import axios from "axios";
const CancelToken = axios.CancelToken;
const search = "/-/v1/search";

let cancelRequest;

export async function getNpmPackage(text, size, from) {
  return await npmApi
    .get(search, {
      params: {
        text,
        size,
        from
      },
      cancelToken: new CancelToken(function executor(c) {
        cancelRequest = c;
      })
    })
    .then(res => res)
    .catch(err => {
      console.log(err);
      throw err;
    });
}

export function cancelGetNpmPackage() {
  if (cancelRequest) {
    cancelRequest("canceled");
    cancelRequest = undefined;
  }
}
