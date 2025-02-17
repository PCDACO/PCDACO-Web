import { useKeywordStore } from "@/stores/store";
import React from "react";
import {
  Form,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OwnerPayLoad } from "@/constants/models/owner.model";
import { useOwnerForm } from "@/hooks/owners/use-form-owner";

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
  const { keyword } = useKeywordStore();
  const { form, onSubmit, isLoading } = useOwnerForm({
    id,
    value,
    action: keyword
  });

  const keywords: KeywordType[] = [
    {
      name: "delete",
      value: "Delete Owner",
      form: (
        <></>
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
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <DialogHeader>
          {GetTitle(keyword)}
          <DialogDescription>
            {keyword === 'delete' ? (<h1>Bạn có muốn xóa không</h1>) : <></>}
          </DialogDescription>
        </DialogHeader>
        {GetComponent(keyword)}
        <DialogFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default OwnerForm;
