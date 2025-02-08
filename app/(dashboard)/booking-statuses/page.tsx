export default async function CarStatusPage() {
    const {value} = await GetBookingStatuses({index: 1, size: 10, keyword: ""});
}