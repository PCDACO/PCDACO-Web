import TechnicianForm from "@/components/technicians/form";

export default async function CreateTechnicianPage() {
    return (<>
        <TechnicianForm id={""} value={{
            address: "",
            dateOfBirth: new Date(),
            email: "",
            name: "",
            password: "",
            phone: "",
            roleName: "",
        }} />
    </>)
}