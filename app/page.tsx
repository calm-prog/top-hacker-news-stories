import {
  getTopStories,
  getTopStoryDetails,
  getUser,
} from '@/client';
import { getRandomItems } from '@/utilities/getRandomItems';
import { Article } from '@/components/Article';
import styles from './page.module.css';

export default async function Home() {
  const topStories = await getTopStories();
  const randomStories = getRandomItems(topStories, 10);
  const listOfStoryDetails = await Promise.all(
    randomStories.map(async (randomStory) =>
      getTopStoryDetails(randomStory)
    )
  );
  const users = await Promise.all(
    listOfStoryDetails
      .filter(
        (storyDetails) => storyDetails?.by !== undefined
      )
      .map((storyDetails) => getUser(storyDetails.by!))
  );

  const sortedListOfStoryDetails =
    listOfStoryDetails.toSorted((a, b) => {
      if (a.score === undefined && b.score === undefined) {
        return a.id - b.id;
      } else if (a.score === undefined) {
        return 1;
      } else if (b.score === undefined) {
        return -1;
      } else {
        return a.score - b.score;
      }
    });

  return (
    <main>
      <h1>10 of the hottest Hacker News stories</h1>
      <section>
        {sortedListOfStoryDetails.map((storyDetails) => (
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
              )?.karma
            }
          />
        ))}
      </section>
    </main>
  );
}
