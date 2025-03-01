export async function urlToFileList(
  url?: string | undefined,
  filename?: string
): Promise<FileList> {
  if (!url || !filename) return new DataTransfer().files;
  const response = await fetch(url);
  const blob = await response.blob();
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(new File([blob], filename, { type: blob.type }));

  return dataTransfer.files; // ✅ Fully resolved FileList
}
