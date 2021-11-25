const URL_FEED_API = "https://api.thedogapi.com/v1/breeds";
const API_KEY_KEY = "x-api-key";
const API_KEY_SECRET = "540cc768-f717-4a7e-8ac1-ba5ccd8b9855";
// The thresh enforced by website. Requests with limit greater than this threshold will get 404.
const FETCH_THRESHOLD_VALUE = 10;
const FETCH_THRESHOLD_KEY = 'limit';
const PAGE_KEY = 'page';

export function getUrlForNextPage(page: number) {
  let url = new URL(URL_FEED_API);
  url.searchParams.append(API_KEY_KEY, API_KEY_SECRET);
  url.searchParams.append(FETCH_THRESHOLD_KEY, FETCH_THRESHOLD_VALUE.toString());
  url.searchParams.append(PAGE_KEY, page.toString());
  return url;
}