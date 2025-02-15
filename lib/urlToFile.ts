import { useState } from "react";
export function urlToFileList(
  url: string,
  filename: string
): {
  FileList: FileList | null;
  isSuccess: boolean;
} {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [FileList, SetFileList] = useState<FileList | null>(null);
  const response = fetch(url, {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  })
    .then((res) => {
      console.log(typeof res.blob());
      return res.blob();
    })
    .then((blob) => {
      const dataTranfer = new DataTransfer();
      dataTranfer.items.add(new File([blob], filename, { type: blob.type }));
      SetFileList(dataTranfer.files);
      setIsSuccess(true);
    })
    .then();
  const [isSuccess, setIsSuccess] = useState(false);
  return {
    FileList,
    isSuccess,
  };
}
