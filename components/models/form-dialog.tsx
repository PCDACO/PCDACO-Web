"use client"

import { useKeywordStore } from "@/stores/store"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { useModelMutation } from "@/hooks/models/use-model"

interface ModelsFormProps {
  id: string;
  isOpen: boolean;
  onOpenChange: () => void;
}

const DialogModelForm = ({ id, isOpen, onOpenChange }: ModelsFormProps) => {
  const { keyword } = useKeywordStore()
  const { deleteModelMutation } = useModelMutation();

  const handleClick = () => {
    deleteModelMutation.mutate(id);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>
          Something
        </DialogTitle>
        <DialogHeader>
        </DialogHeader>
        <DialogHeader>
          <DialogDescription>{keyword === "delete" ? <p>Bạn có muốn xóa không?</p> : <></>}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleClick} disabled={deleteModelMutation.isLoading} className="w-full">
            {deleteModelMutation.isLoading ? "Loading..." : "Xóa"}
          </Button>
        </DialogFooter>
      </DialogContent >
    </Dialog >
  )
}

export default DialogModelForm
