import React from "react";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";


const ReportForm = () => {
  return (
    <>
      <DialogHeader>
        <DialogDescription>
          <h1>Bạn có muốn không</h1>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        {/* <Button type="submit" disabled={isLoading}> */}
        {/*   {isLoading ? "Loading..." : "Submit"} */}
        {/* </Button> */}
      </DialogFooter>
    </>
  );
};

export default ReportForm;
