interface Employee {
  id: string;
  name: string;
  surname: string;
  count: number;
}

interface EmployeesProps {
  employees: Employee[];
  selectedEmployee: Employee | null;
  setSelectedEmployee: (employee: Employee) => void;
}

export default function Employees({
  employees,
  selectedEmployee,
  setSelectedEmployee,
}: EmployeesProps) {
  return (
    <div className="flex flex-col w-80 h-80 bg-[#4263eb] border-white border-solid border p-4 justify-start items-center rounded-md overflow-y-scroll">
      <ul className="flex flex-col gap-2">
        {employees.map((employee) => (
          <li
            className={`text-white text-center p-1 rounded-md hover:cursor-pointer ${
              selectedEmployee?.id === employee.id
                ? "bg-[#364fc7]"
                : "bg-[#4263eb]"
            }`}
            key={employee.id}
            onClick={() => setSelectedEmployee(employee)}
          >
            {employee.name} {employee.surname}
          </li>
        ))}
      </ul>
    </div>
  );
}
