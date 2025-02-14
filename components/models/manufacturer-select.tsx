import * as React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ManufactureResponse } from '@/constants/models/manufacture.model';

export default function ManufacturerSelect({
    datas,
    value,
    onChange
}: {
    datas: ManufactureResponse[],
    value: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: any
}) {
    return (
        <Select onValueChange={onChange} value={value}>
            <SelectTrigger className="w-[240px] border-2 border-r-4">
                <SelectValue placeholder="Chọn nhà sản xuất" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {datas?.map((data) => (
                        <SelectItem key={data.id} value={data.id}>{data.name}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select >
    )
}