import React, { useEffect, useState } from "react";
import {
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useUserMutation } from "@/hooks/users/use-user";
import { Input } from "../ui/input";
import { useBanStore, useIdStore } from "@/stores/store";
import { Label } from "../ui/label";
import { LoadingSpinner } from "../ui/loading-spinner";

const OwnerForm = () => {
  const { isBanned } = useBanStore();
  const { id } = useIdStore();
  const [bannedReason, setBannedReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { banUser, unbanUser } = useUserMutation();
  const handleSubmit = () => {
    if (isBanned) {
      unbanUser.mutate({ id });
      return;
    }
    banUser.mutate({ id, bannedReason });
  }
  const handleChange = (value: string) => {
    setBannedReason(value);
  }
  useEffect(() => {
    if (banUser.isLoading || unbanUser.isLoading) {
      setIsLoading(true);
    }
  }, [banUser.isLoading, unbanUser.isLoading])
  return (
    <>
      <DialogHeader>
        <Label className="font-bold text-lg">
          {isBanned ? "Gỡ Chặn Người Dùng" : "Chặn Người Dùng"}
        </Label>
      </DialogHeader>
      {!isBanned && <Label className="text-md">Lí do chặn</Label>}
      {!isBanned && <Input value={bannedReason} onChange={(e) => handleChange(e.currentTarget.value)} />}
      {isBanned ? (<h1>Bạn có muốn gỡ cấm không</h1>) : (<h1>Bạn có muốn cấm không</h1>)}
      <DialogFooter>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? <LoadingSpinner /> : (isBanned ? "Gỡ Chặn" : "Chặn")}
        </Button>
      </DialogFooter>
    </>
  );
};

export default OwnerForm;
