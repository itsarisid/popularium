import { redirect } from "next/navigation";
import OverViewLayout from "./overview/layout";
import Sales from "./overview/@sales/page";
import Stats from "./overview/@pie_stats/page";
import BarStats from "./overview/@bar_stats/page";
import AreaStats from "./overview/@area_stats/page";

export default async function Dashboard() {
  return (
    <OverViewLayout
      sales={<Sales />}
      pie_stats={<Stats />}
      bar_stats={<BarStats />}
      area_stats={<AreaStats />}
    />
  );
}
