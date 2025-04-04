export const formatId = (uuid: string) => {
  return `${uuid.slice(0, 4)}....${uuid.slice(-4)}`;
}
