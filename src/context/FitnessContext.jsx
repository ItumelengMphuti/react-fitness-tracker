/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "fitflow_fitness_data";
const FitnessContext = createContext(null);

function readData() {
  try {
    return {
      data: JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
        planner: {},
        history: [],
      },
      error: null,
    };
  } catch {
    return {
      data: { planner: {}, history: [] },
      error: "Saved fitness data could not be loaded.",
    };
  }
}

export function FitnessProvider({ children }) {
  const [{ data, error }, setState] = useState(readData);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      console.error("FitFlow could not save fitness data.");
    }
  }, [data]);

  const value = useMemo(
    () => ({
      planner: data.planner,
      history: data.history,
      error,
      /** Add or replace an exercise in a day's plan. */
      addToPlanner(day, exercise) {
        setState((current) => ({
          ...current,
          data: {
            ...current.data,
            planner: {
              ...current.data.planner,
              [day]: [
                ...(current.data.planner[day] || []).filter(
                  (item) => item.id !== exercise.id,
                ),
                exercise,
              ],
            },
          },
        }));
      },
      /** Remove an exercise from a day's plan by its stable exercise id. */
      removeFromPlanner(day, exerciseId) {
        setState((current) => ({
          ...current,
          data: {
            ...current.data,
            planner: {
              ...current.data.planner,
              [day]: (current.data.planner[day] || []).filter(
                (item) => item.id !== exerciseId,
              ),
            },
          },
        }));
      },
      /** Record a completed workout at the beginning of the history list. */
      logWorkout(workout) {
        setState((current) => ({
          ...current,
          data: {
            ...current.data,
            history: [{ ...workout, id: Date.now() }, ...current.data.history],
          },
        }));
      },
    }),
    [data, error],
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
