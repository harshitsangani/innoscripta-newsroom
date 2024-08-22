import moment from "moment";
import { useEffect, useState } from "react";

export function Header() {
  const [time, setTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <header>
      <div className="flex justify-between p-2">
        <div className="font-mono text-xs">Version: 1.0.0</div>
        <div className="font-mono text-xs">
          Date: {time.format("YYYY-MM-DD | HH:mm:ss")}
        </div>
      </div>
      <div className="border-y border-black py-3 md:pt-4 md:pb-6 text-3xl md:text-7xl font-display text-center">
        The <span className="text-[#389f9b]">InnoScripta</span> Times
      </div>
    </header>
  );
}
