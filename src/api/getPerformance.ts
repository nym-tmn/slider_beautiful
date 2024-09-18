export type ImageData = {
  id: number
  src: string
  title: string
  text: string
};

export const getPerformance = async (): Promise<ImageData[]> => {
  const response = await fetch('http://localhost:9000/performance');
  const data = response.json();
  return data;
};
