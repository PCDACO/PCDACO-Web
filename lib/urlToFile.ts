export async function urlToFileList(
  url: string,
  filename: string
): Promise<FileList> {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  });
  const blob = await response.blob();
  const file = new File([blob], filename, { type: blob.type });
  // Convert File into FileList
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  return dataTransfer.files; // FileList
}
