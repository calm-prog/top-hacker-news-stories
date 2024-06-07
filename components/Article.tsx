import { FilteredTopStory } from '@/app/page';
import { User } from '@/client';
import Image from 'next/image';
import styles from './article.module.scss';

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
    <article className={styles.article}>
      <header>
        <h2 className={styles.h2}>{title}</h2>
      </header>
      <div className={styles.articleContent}>
        <div className={styles.articleInfo}>
          <div>Score: {score}</div>
          <time
            dateTime={new Date(
              time * 1000
            ).toLocaleDateString()}
          >
            Created at:{' '}
            {new Date(time * 1000).toLocaleDateString()}
          </time>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block' }}
          >
            See article
          </a>
        </div>
        <div className={styles.authorInfo}>
          <div className={styles.author}>
            <Image
              src="/programmer-svgrepo-com.svg"
              width={75}
              height={75}
              alt="Author icon"
              className={styles.authorIcon}
            />
            <div>
              <strong>{by}</strong>
            </div>
          </div>
          <div>Karma: {karma}</div>
        </div>
      </div>
    </article>
  );
};
