import { FilteredTopStory } from '@/app/page';
import { User } from '@/client';

type ArticleProps = Pick<
  FilteredTopStory,
  'by' | 'score' | 'time' | 'title' | 'url'
> &
  Pick<User, 'karma'>;

export const Article = ({
  by,
  score,
  time,
  title,
  url,
  karma,
}: ArticleProps): JSX.Element => {
  return (
    <article>
      <header>
        <h2>{title}</h2>
      </header>
      <div>
        <div>Score: {score}</div>
        <time
          dateTime={new Date(
            time * 1000
          ).toLocaleDateString()}
        >
          Created at:{' '}
          {new Date(time * 1000).toLocaleDateString()}
        </time>
      </div>
      <div>
        <div>Author: {by}</div>
        <div>Karma: {karma}</div>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        See article
      </a>
    </article>
  );
};
