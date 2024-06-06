export const getRandomItems = (
  items: number[],
  count: number
): number[] => {
  const numberOfRandomItems =
    items.length < count ? items.length : count;

  const randomIndices = Array.from({
    length: numberOfRandomItems,
  }).reduce((acc: number[]) => {
    const getRandomIndex = () =>
      Math.floor(Math.random() * items.length - 1);
    const getUniqueItemIndex = (): number => {
      const index = getRandomIndex();
      return acc.includes(index)
        ? getUniqueItemIndex()
        : index;
    };
    return [...acc, getUniqueItemIndex()];
  }, []);

  return randomIndices.map((index) => items[index]);
};
