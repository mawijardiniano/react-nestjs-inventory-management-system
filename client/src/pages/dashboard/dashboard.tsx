import StatsCard from "../../components/statsCard";
import Chart from "../../components/chart";
export default function dashboard() {
  return (
    <div className="gap-4 flex flex-col">
      <StatsCard />
      <Chart />
    </div>
  );
}
