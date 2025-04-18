import { Card, CardContent, CardHeader } from "../ui/card";
import { ChevronsLeftIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  id: string;
  contractHtml: Document;
}
const ContractDetailComponent = ({ id, contractHtml }: Props) => {
  return (
    <Card>
      <CardContent>
        <CardHeader>
          <Link href={`/bookings/${id}`}  >
            <ChevronsLeftIcon />
          </Link>
        </CardHeader>
        <div
          className="max-h-[70vh] overflow-y-auto"
          dangerouslySetInnerHTML={{
            __html: contractHtml.toString()
          }}
        />
      </CardContent>
    </Card >
  )
}

export default ContractDetailComponent;
