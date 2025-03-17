import ConsultantForm from "@/components/consultants/form";

export default async function CreateTechnicianPage() {
    return (<>
        <ConsultantForm id={""} value={{
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