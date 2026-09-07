/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "fitflow_fitness_data";
const FitnessContext = createContext(null);

function readData() {
  try {
    return (
      JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
        planner: {},
        history: [],
      }
    );
  } catch {
    return { planner: {}, history: [] };
  }
}

export function FitnessProvider({ children }) {
  const [data, setData] = useState(readData);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const value = useMemo(
    () => ({
      planner: data.planner,
      history: data.history,
      addToPlanner(day, exercise) {
        setData((current) => ({
          ...current,
          planner: {
            ...current.planner,
            [day]: [
              ...(current.planner[day] || []).filter(
                (item) => item.id !== exercise.id,
              ),
              exercise,
            ],
          },
        }));
      },
      removeFromPlanner(day, exerciseId) {
        setData((current) => ({
          ...current,
          planner: {
            ...current.planner,
            [day]: (current.planner[day] || []).filter(
              (item) => item.id !== exerciseId,
            ),
          },
        }));
      },
      logWorkout(workout) {
        setData((current) => ({
          ...current,
          history: [{ ...workout, id: Date.now() }, ...current.history],
        }));
      },
    }),
    [data],
  );

  return (
    <FitnessContext.Provider value={value}>{children}</FitnessContext.Provider>
  );
}

export function useFitness() {
  const context = useContext(FitnessContext);
  if (!context)
    throw new Error("useFitness must be used inside a <FitnessProvider>");
  return context;
}
