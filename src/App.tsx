import { useState } from "react";
import FirstCompany from "./data/empleyesCompany1.json";
import SecondCompany from "./data/employesCompany2.json";
import Employees from "./components/Employees";
import ChangeCompany from "./components/ChangeCompany";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SwitchTheme from "./components/SwitchTheme";

interface Employee {
  id: string;
  name: string;
  surname: string;
  count : number;
}

export default function App() {
  const [employesFirstCompany, setEmployesFirstCompany] =
    useState<Employee[]>(FirstCompany);
  const [employesSecondCompany, setEmployesSecondCompany] =
    useState<Employee[]>(SecondCompany);
  const [employeeSelectedData, setEmployeeSelectData] =
    useState<Employee | null>(null);
  const [employeeSelected, setEmployeeSelect] = useState(false);
  const [trackCount, setTrackCount] = useState(0);
  const [changeColorTheme, setChangeColorTheme] = useState(false);

  console.log(employesFirstCompany, 'PRIMEIRA');
  console.log(employesSecondCompany, 'SEGUNDA');

  const getCurrentCompany = (employee: Employee | null): "CompanyOne" | "CompanyTwo" | null => {
    if (!employee) return null;
    if (employesFirstCompany.some(emp => emp.id === employee.id)) return "CompanyOne";
    if (employesSecondCompany.some(emp => emp.id === employee.id)) return "CompanyTwo";
    return null;
  };

  const goToCompanyTwo = (employee: Employee) => {
    if(employee.count < 10){
      if (employeeSelected && employee && getCurrentCompany(employee) === "CompanyOne") {
        const updateFirstCompany = employesFirstCompany.filter(
          (emp) => emp.id !== employee.id
        );
        const updateSecondCompany = [...employesSecondCompany, {...employee, count: employee.count + 1 }];
        setEmployesFirstCompany(updateFirstCompany);
        setEmployesSecondCompany(updateSecondCompany);
        setTrackCount(trackCount + 1);
        setEmployeeSelect(false);
        setEmployeeSelectData(null);
      }
    }else{
      toast.error("Each employee can only be transferred 10 times between companies.", {
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


  const goToCompanyOne = (employee: Employee) => {
    if (employeeSelected && employee && getCurrentCompany(employee) === "CompanyTwo") {
      const updateSecondCompany = employesSecondCompany.filter(
        (emp) => emp.id !== employee.id
      );
      const updateFirstCompany = [...employesFirstCompany, {...employee, count: employee.count + 1}];
      setEmployesSecondCompany(updateSecondCompany);
      setEmployesFirstCompany(updateFirstCompany);
      setTrackCount(trackCount + 1);
      setEmployeeSelect(false);
      setEmployeeSelectData(null);
    }
  };

  return (
    <div className={`w-full h-dvh flex justify-center items-center flex-col gap-8 ${changeColorTheme ? "bg-[#00082f]" : "#edf2ff" }`}>
      <SwitchTheme changeTheme={changeColorTheme} setChangeTheme={setChangeColorTheme}/>
      <h1 className={` font-bold text-3xl text-center sm:text-xl ${changeColorTheme ? "text-white" : "text-black"} `}>Employess Management System</h1>
      <div className="justify-center items-center flex-row md:flex-col flex w-full gap-4">
        <Employees
          employees={employesFirstCompany}
          selectedEmployee={employeeSelectedData}
          setSelectedEmployee={(employee) => {
            setEmployeeSelectData(employee);
            setEmployeeSelect(true);
          }}
        />
        <ChangeCompany
          employeeSelected={employeeSelected}
          employeeSelectedData={employeeSelectedData}
          currentCompany={getCurrentCompany(employeeSelectedData)}
          goToCompanyOne={goToCompanyOne}
          goToCompanyTwo={goToCompanyTwo}
        />
        <Employees
          employees={employesSecondCompany}
          selectedEmployee={employeeSelectedData}
          setSelectedEmployee={(employee) => {
            setEmployeeSelectData(employee);
            setEmployeeSelect(true);
          }}
        />
      </div>
      <div className="flex justify-center items-center rounded-full bg-[#4263eb] w-52 p-2">
        <p className="text-white">{`Total Of Transfers: ${trackCount}`}</p>
      </div>
      <ToastContainer />
    </div>
  );
}
