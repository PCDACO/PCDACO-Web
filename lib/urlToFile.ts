export async function urlToFileList(
  url: string,
  filename: string
): Promise<FileList> {
  const response = await fetch(url);
  const blob = await response.blob();
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(new File([blob], filename, { type: blob.type }));

  return dataTransfer.files; // ✅ Fully resolved FileList
}
