import CaloriesDisplay from "./CaloriesDisplay";
import { useActivity } from "../hooks/useActivity";

export default function CalorieTracker() {
  const { caloriesConsumed, caloriesBurn, netCalories } = useActivity();

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de Calorias
      </h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CaloriesDisplay calories={caloriesConsumed} text={"consumidas"} />
        <CaloriesDisplay calories={caloriesBurn} text={"quemadas"} />
        <CaloriesDisplay calories={netCalories} text={"Diferendia"} />
      </div>
    </>
  );
}
