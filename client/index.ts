const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

type Path =
  | '/topstories'
  | `/item/${number}`
  | `/user/${string}`;

const getUrlForPath = (path: Path): string =>
  BASE_URL + path + '.json';

const fetchData = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export const getTopStories = async (): Promise<
  number[]
> => {
  return fetchData(getUrlForPath('/topstories'));
};

// For the sake of simplicity only required properties are typed
export interface TopStoryDetails {
  by?: string;
  id: number;
  score?: number;
  time?: number;
  title?: string;
  url?: string;
}

export const getTopStoryDetails = async (
  itemId: number
): Promise<TopStoryDetails> => {
  return fetchData(getUrlForPath(`/item/${itemId}`));
};

export interface User {
  id: string;
  karma: number;
}

export const getUser = async (
  userId: string
): Promise<User> => {
  return fetchData(getUrlForPath(`/user/${userId}`));
};
