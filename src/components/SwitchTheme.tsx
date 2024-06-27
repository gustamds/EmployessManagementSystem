import { Moon, Sun } from "@phosphor-icons/react";

interface SwitchThemeProps{
    changeTheme: boolean;
    setChangeTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SwitchTheme({ changeTheme, setChangeTheme } : SwitchThemeProps) {

  return (
    <button
      className="border rounded-md p-2 bg-[#4263eb] hover:bg-[#364fc7] transition-all duration-400"
      onClick={() => setChangeTheme(!changeTheme)}
    >
      {changeTheme ? (
        <Sun size={28} color="#ffffff" />
      ) : (
        <Moon size={28} color="#ffffff" />
      )}
    </button>
  );
}
