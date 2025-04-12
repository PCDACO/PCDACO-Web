import { useKeywordStore } from "@/stores/store";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useInspectionScheduleForm } from "@/hooks/inspection-schedules/use-form-inspection-schedule";
import { InspectionSchedulePayload } from "@/constants/models/inspection-schedule.model";
import { useEffect, useState } from "react";
import { useTechnicianQuery } from "@/hooks/technicians/use-technician";
import SelectWithSearch from "../ui/select-search";
import { TechnicianResponse } from "@/constants/models/technician.model";
import { Button } from "../ui/button";
import { LoadingSpinner } from "../ui/loading-spinner";

interface Props {
  id: string;
  value: InspectionSchedulePayload;
  isOpen: boolean;
  onOpenChange: () => void;
}

interface SelectParams {
  id: string;
  value: string;
}

type KeywordType = {
  name: string;
  value: string;
  form: React.JSX.Element;
};


const UpdateInspectionForm = ({
  id, value, isOpen, onOpenChange
}: Props) => {
  const { keyword } = useKeywordStore();
  const { form, onSubmit, isLoading } = useInspectionScheduleForm({
    id: id ?? "",
    keyword: keyword,
    value: value
  });
  const [currentTechnicianName, setCurrentTechnicianName] = useState("");
  const [technicians, setTechnicians] = useState<TechnicianResponse[]>([]);
  const { listTechnicians } = useTechnicianQuery({
    params: {
      index: 1,
      size: 1000,
      keyword: ""
    }
  });


  useEffect(() => {
    if (listTechnicians.data) {
      setCurrentTechnicianName(listTechnicians?.data?.value?.items?.find(t => t.id === value.technicianId)?.name ?? "");
      setTechnicians(listTechnicians?.data?.value?.items ?? [])
    }
  }, [listTechnicians])

  useEffect(() => {
    if (id) {
      form.setValue("isIncident", value.isIncident);
      form.setValue("technicianId", value.technicianId);
      form.setValue("carId", value.carId);
      form.setValue("inspectionDate", value.inspectionDate);
      form.setValue("inspectionAddress", value.inspectionAddress);
    }
  }, [id, form])


  const keywords: KeywordType[] = [
    {
      name: "update",
      value: "Cập nhật lịch xác nhận",
      form: (
        <div>
          <FormField
            control={form.control}
            name="technicianId"
            render={({ field }) => {
              const selectedTechnicianObject = technicians
                .map((technician) => {
                  return {
                    id: technician.id,
                    value: technician.name,
                  };
                })
                .find(
                  (tech) => tech.id === field.value // field.value holds the ID string
                );

              const handleSelectChange = (
                selectedOption: SelectParams | null
              ) => {
                field.onChange(selectedOption ? selectedOption.id : null); // Pass the ID (or null) to RHF
              };
              return (
                <FormItem>
                  <FormLabel>Kĩ Thuật Viên</FormLabel>
                  <FormControl>
                    <SelectWithSearch<SelectParams> // Specify the data type
                      options={technicians.map((technician) => {
                        return {
                          id: technician.id,
                          value: technician.name,
                        };
                      })}
                      value={selectedTechnicianObject}
                      onValueChange={handleSelectChange}
                      valueKey="id"
                      labelKey="value"
                      placeholder="Chọn Kĩ Thuật Viên"
                      searchPlaceholder="Tìm kiếm KTV..."
                      emptyText="Không tìm thấy KTV."
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
        </div>
      )
    },
    {
      name: "delete",
      value: "Hủy lịch xác nhận",
      form: (
        <></>
      )
    }
  ];
  // Handle
  const getTitle = (name: string) => {
    const title = keywords.find(t => t.name === name);
    if (!title) {
      return;
    }
    return <DialogTitle>{title.value}</DialogTitle>
  }

  const getForm = (name: string) => {

    const title = keywords.find(t => t.name === name);
    if (!title) {
      return;
    }
    return title.form;
  }

  const handleSubmitClick = () => {
    console.log(form.getValues());
  }

  return <Dialog
    open={isOpen}
    onOpenChange={onOpenChange}
  >
    <DialogContent>
      <Form {...form} >
        <form onSubmit={onSubmit} className="gap-y-6">
          <> {getTitle(keyword)} </>
          <DialogDescription>Current Technician: {currentTechnicianName}</DialogDescription>
          <>{getForm(keyword)}</>
          <DialogFooter>
            <Button onClick={handleSubmitClick} type="submit" variant="ghost">
              {isLoading ? <LoadingSpinner /> : "Hoàn tất"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  </Dialog>
}

export default UpdateInspectionForm;
