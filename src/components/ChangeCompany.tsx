import { ArrowCircleRight, ArrowCircleLeft } from "@phosphor-icons/react";
import { toast } from "react-toastify";

interface Employee {
  id: string;
  name: string;
  surname: string;
  count: number;
}

interface ChangeCompanyProps {
  employeeSelected: boolean;
  employeeSelectedData: Employee | null;
  currentCompany: "CompanyOne" | "CompanyTwo" | null;
  goToCompanyOne: (employee: Employee) => void;
  goToCompanyTwo: (employee: Employee) => void;
}

export default function ChangeCompany({
  employeeSelected,
  employeeSelectedData,
  currentCompany,
  goToCompanyOne,
  goToCompanyTwo,
}: ChangeCompanyProps) {
  const handleTransfer = (direction: string) => {
    if (employeeSelected && employeeSelectedData) {
      if (direction === "toCompanyTwo") {
        goToCompanyTwo(employeeSelectedData);
      } else if (direction === "toCompanyOne") {
        goToCompanyOne(employeeSelectedData);
      }
    } else {
      toast.error("You must select an employee to transfer.", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <button
        className={`flex justify-center items-center w-16 h-16 border border-solid border-white bg-[#4263eb] p-4 md:rotate-90 ${
          !employeeSelected || currentCompany !== "CompanyOne"
            ? "cursor-not-allowed opacity-40 hover:bg-[#4263eb]"
            : ""
        } transition-all duration-400 rounded-md hover:bg-[#364fc7]`}
        onClick={() => handleTransfer("toCompanyTwo")}
      >
        <ArrowCircleRight size={48} color="#ffffff" />
      </button>
      <button
        className={`flex justify-center items-center w-16 h-16 border border-solid border-white bg-[#4263eb] p-4 md:rotate-90 ${
          !employeeSelected || currentCompany !== "CompanyTwo"
            ? "cursor-not-allowed opacity-40 hover:bg-[#4263eb]"
            : ""
        } transition-all duration-400 rounded-md hover:bg-[#364fc7]`}
        onClick={() => handleTransfer("toCompanyOne")}
      >
        <ArrowCircleLeft size={48} color="#ffffff" />
      </button>
    </div>
  );
}
