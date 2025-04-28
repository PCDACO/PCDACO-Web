import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
interface OwnerDetailProps {
  id: string,
  isOpen: boolean
  onClose: () => void
}

export default function OwnerDetailsDialog({ isOpen, onClose }: OwnerDetailProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold"></DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[80vh] pr-4">
          <div className="space-y-8">
            <section className="flex items-center space-x-4">
              <Image
                src="/dummy-avatar.webp"
                alt=""
                width={64}
                height={64}
                className="rounded-full"
              />
            </section>
            <section>
              <h3 className="font-semibold text-lg mb-2">Mặt Trước</h3>
              {/* <Image src={ownerQuery.data.value.}/> */}
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">Mô Tả</h3>
              <p></p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">Địa Điểm</h3>
              <p></p>
            </section>

          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog >
  )
}


