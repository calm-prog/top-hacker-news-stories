import {
  TopStoryDetails,
  getTopStories,
  getTopStoryDetails,
  getUser,
} from '@/client';
import { shuffleArray } from '@/utilities/shuffleArray';
import { Article } from '@/components/Article';
import styles from './page.module.scss';

const REQUIRED_PROPERTIES = [
  'by',
  'score',
  'time',
  'title',
  'url',
];

export type FilteredTopStory = Required<TopStoryDetails>;

export default async function Home() {
  const topStories = await getTopStories();
  const shuffledStories = shuffleArray(topStories);

  const getListOfStoryDetails = async (
    index: number,
    storyList: TopStoryDetails[]
  ): Promise<FilteredTopStory[]> => {
    const story = await getTopStoryDetails(
      shuffledStories[index]
    );
    const storyKeys = Object.keys(story);
    const includesAllProperties = REQUIRED_PROPERTIES.every(
      (property) => storyKeys.includes(property)
    );
    const newStoryList = includesAllProperties
      ? [...storyList, story]
      : storyList;
    return newStoryList.length === 10 ||
      index === topStories.length - 1
      ? (newStoryList as FilteredTopStory[])
      : ((await getListOfStoryDetails(
          index + 1,
          newStoryList
        )) as FilteredTopStory[]);
  };

  const listOfStoryDetails = await getListOfStoryDetails(
    0,
    []
  );
  const users = await Promise.all(
    listOfStoryDetails.map((storyDetails) =>
      getUser(storyDetails.by)
    )
  );

  return (
    <main>
      <h1>10 of the hottest Hacker News stories</h1>
      <section>
        {listOfStoryDetails
          .toSorted((a, b) => a.score - b.score)
          .map((storyDetails) => (
            <Article
              key={storyDetails.id}
              by={storyDetails.by}
              score={storyDetails.score}
              time={storyDetails.time}
              title={storyDetails.title}
              url={storyDetails.url}
              karma={
                users.find(
                  (user) => storyDetails.by === user.id
                  // We already map using the `by` property
                  // and `karma` is required property in the api docs
                )!.karma
              }
            />
          ))}
      </section>
    </main>
  );
}
