import StatsCard from "../../components/statsCard";
import Chart from "../../components/chart";
import Haha from "../../components/haha";
export default function dashboard() {
  return (
    <div className="gap-4 flex flex-col">
      <StatsCard />
      <Chart />
      <Haha/>
    </div>
  );
}
