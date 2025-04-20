import React, { FunctionComponent } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useWithdrawRequestStore } from "@/stores/use-params";
import { translate } from "@/lib/translate";
import { WithdrawRequestStatusNumber, WithdrawRequestStatusString } from "@/constants/enums/withdraw-request.enum";

const WithdrawRequestFilter: FunctionComponent = () => {
  const { setParams } = useWithdrawRequestStore();

  return (
    <Select
      onValueChange={(value) =>
        setParams({
          status: WithdrawRequestStatusNumber[value as keyof typeof WithdrawRequestStatusNumber],
        })
      }
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Trạng thái yêu cầu" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(WithdrawRequestStatusString).map((status) => (
          <SelectItem className="hover:cursor-pointer" key={status} value={status}>
            {translate.withdrawRequest.status[status]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default WithdrawRequestFilter;
