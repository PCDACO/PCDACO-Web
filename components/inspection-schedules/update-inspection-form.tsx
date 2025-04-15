"use client"
import { useKeywordStore } from "@/stores/store";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Form } from "../ui/form";
import { useInspectionScheduleForm } from "@/hooks/inspection-schedules/use-form-inspection-schedule";
import { InspectionSchedulePayload } from "@/constants/models/inspection-schedule.model";
import { useEffect, useState } from "react";
import { useTechnicianQuery } from "@/hooks/technicians/use-technician";
import SelectWithSearch from "../ui/select-search";
import { TechnicianResponse } from "@/constants/models/technician.model";
import { Button } from "../ui/button";
import { LoadingSpinner } from "../ui/loading-spinner";
import { useInspectionScheduleMutation } from "@/hooks/inspection-schedules/use-inspection-schedules";

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
  const [selectedTechnicianObject, setSelectedTechnicianObject] = useState<SelectParams>();
  const { updateInspectionSchedule, deleteInspectionSchedule } = useInspectionScheduleMutation();
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
    //eslint-disable-next-line
  }, [listTechnicians])

  const handleSubmitClick = () => {
    if (keyword === "update") {
      const payload = form.getValues();
      updateInspectionSchedule.mutate({
        id: id ?? "",
        payload: payload
      })
    }
    if (keyword === "delete") {
      deleteInspectionSchedule.mutate(id)
    }
  }

  useEffect(() => {
    if (id) {
      form.setValue("inspectionType", value.inspectionType);
      form.setValue("technicianId", value.technicianId);
      form.setValue("carId", value.carId);
      form.setValue("inspectionDate", value.inspectionDate);
      form.setValue("inspectionAddress", value.inspectionAddress);
    }
    setSelectedTechnicianObject(() => {
      return technicians
        .map((technician) => {
          return {
            id: technician.id,
            value: technician.name,
          };
        })
        .find(
          (tech) => tech.id === form.getValues().technicianId
        );
    })
    //eslint-disable-next-line
  }, [id, form])




  const keywords: KeywordType[] = [
    {
      name: "update",
      value: "Cập nhật lịch xác nhận",
      form: (
        <div>
          <SelectWithSearch<SelectParams> // Specify the data type
            options={technicians.map((technician) => {
              return {
                id: technician.id,
                value: technician.name,
              };
            })}
            value={selectedTechnicianObject}
            onValueChange={(searchParams) => {
              form.setValue("technicianId", searchParams?.id ?? "");
              if (searchParams) {
                setSelectedTechnicianObject(technicians.map(item => {
                  return {
                    id: item.id,
                    value: item.name,
                  }
                }).find(item => item.id === searchParams?.id))
              }
            }}
            valueKey="id"
            labelKey="value"
            placeholder="Chọn Kĩ Thuật Viên"
            searchPlaceholder="Tìm kiếm KTV..."
            emptyText="Không tìm thấy KTV."
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

  return <Dialog
    open={isOpen}
    onOpenChange={onOpenChange}
  >
    <DialogContent>
      <Form {...form}>
        <form onSubmit={onSubmit} className="gap-y-6">
          <DialogHeader>
            {getTitle(keyword)}
            <DialogDescription>
              {keyword === "delete" ? "Bạn có chắc chắn muốn xóa lịch xác nhận này ?" : `Hiện Tại: ${currentTechnicianName}`}
            </DialogDescription>
          </DialogHeader>
          {getForm(keyword)}
          <DialogFooter>
            <Button onClick={handleSubmitClick} className="mt-10" type="submit" variant="ghost">
              {isLoading ? <LoadingSpinner /> : "Hoàn tất"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  </Dialog>
}

export default UpdateInspectionForm;
