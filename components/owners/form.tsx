import { useKeywordStore } from "@/stores/store";
import React from "react";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OwnerPayLoad } from "@/constants/models/owner.model";

interface OwnerFormProps {
  id: string;
  value: OwnerPayLoad;
}
type KeywordType = {
  name: string;
  value: string;
  form: React.JSX.Element;
};

const OwnerForm = ({ id, value }: OwnerFormProps) => {
  console.log(id, value);
  const { keyword } = useKeywordStore();
  const keywords: KeywordType[] = [
    {
      name: "delete",
      value: "Delete Owner",
      form: (
        <>
        </>
      )
    }
  ];
  const GetTitle = (name: string) => {
    const selected = keywords.find(k => k.name === name);
    return selected ?
      <DialogTitle>
        {selected.value}
      </DialogTitle>
      : null;
  };
  const GetComponent = (name: string) => {
    const selected = keywords.find(k => k.name === name);
    return selected ?
      <DialogTitle>
        {selected.form}
      </DialogTitle>
      : null;
  };
  return (
    <>
      <DialogHeader>
        {GetTitle(keyword)}
        <DialogDescription>
          {keyword === 'delete' ? (<h1>Bạn có muốn xóa không</h1>) : <></>}
        </DialogDescription>
      </DialogHeader>
      {GetComponent(keyword)}
      <DialogFooter>
        {/* <Button type="submit" disabled={isLoading}> */}
        {/*   {isLoading ? "Loading..." : "Submit"} */}
        {/* </Button> */}
      </DialogFooter>
    </>
  );
};

export default OwnerForm;
