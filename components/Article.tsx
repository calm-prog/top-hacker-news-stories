import { TopStoryDetails, User } from '@/client';

type ArticleProps = Pick<
  TopStoryDetails,
  'by' | 'score' | 'time' | 'title' | 'url'
> & { karma: User['karma'] | undefined };

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
      {title && (
        <header>
          <h2>{title}</h2>
        </header>
      )}
      <div>
        {score && <div>Score: {score}</div>}
        {time && (
          <time
            dateTime={new Date(
              time * 1000
            ).toLocaleDateString()}
          >
            Created at:{' '}
            {new Date(time * 1000).toLocaleDateString()}
          </time>
        )}
      </div>
      {by && (
        <div>
          <div>Author: {by}</div>
          <div>Karma: {karma}</div>
        </div>
      )}
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          See article
        </a>
      )}
    </article>
  );
};
