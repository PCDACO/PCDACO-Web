import React, { FunctionComponent } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useCarParamsStore } from "@/stores/use-params";
import {
  CarStatusNumber,
  CarStatusString,
} from "@/constants/enums/car-status.enum";
import { translate } from "@/lib/translate";

const CarFilter: FunctionComponent = () => {
  const { setParams } = useCarParamsStore();

  return (
    <Select
      onValueChange={(value) =>
        setParams({
          status: CarStatusNumber[value as keyof typeof CarStatusNumber],
        })
      }
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Trạng thái xe " />
      </SelectTrigger>
      <SelectContent>
        {Object.values(CarStatusString).map((status) => (
          <SelectItem key={status} value={status}>
            {translate.car.status[status]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CarFilter;
