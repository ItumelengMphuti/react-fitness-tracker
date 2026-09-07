import { renderHook, act } from "@testing-library/react";
import { FitnessProvider, useFitness } from "./FitnessContext";

const wrapper = ({ children }) => <FitnessProvider>{children}</FitnessProvider>;

describe("FitnessContext", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  test("provides an empty planner and history initially", () => {
    const { result } = renderHook(() => useFitness(), { wrapper });

    expect(result.current.planner).toEqual({});
    expect(result.current.history).toEqual([]);
  });

  test("loads saved data from localStorage", () => {
    const savedData = {
      planner: {
        Monday: [{ id: "push-up", name: "Push-up" }],
      },
      history: [
        {
          id: 1,
          exercise: "Push-up",
          sets: 3,
          reps: 10,
          weight: 20,
        },
      ],
    };

    localStorage.setItem("fitflow_fitness_data", JSON.stringify(savedData));

    const { result } = renderHook(() => useFitness(), { wrapper });

    expect(result.current.planner).toEqual(savedData.planner);
    expect(result.current.history).toEqual(savedData.history);
  });

  test("adds an exercise to a planner day", () => {
    const { result } = renderHook(() => useFitness(), { wrapper });

    const exercise = {
      id: "push-up",
      name: "Push-up",
    };

    act(() => {
      result.current.addToPlanner("Monday", exercise);
    });

    expect(result.current.planner.Monday).toEqual([exercise]);
  });

  test("replaces a duplicate exercise instead of adding it twice", () => {
    const { result } = renderHook(() => useFitness(), { wrapper });

    const exercise = {
      id: "push-up",
      name: "Push-up",
    };

    act(() => {
      result.current.addToPlanner("Monday", exercise);
      result.current.addToPlanner("Monday", exercise);
    });

    expect(result.current.planner.Monday).toHaveLength(1);
    expect(result.current.planner.Monday[0]).toEqual(exercise);
  });

  test("allows the same exercise on different days", () => {
    const { result } = renderHook(() => useFitness(), { wrapper });

    const exercise = {
      id: "push-up",
      name: "Push-up",
    };

    act(() => {
      result.current.addToPlanner("Monday", exercise);
      result.current.addToPlanner("Wednesday", exercise);
    });

    expect(result.current.planner.Monday).toHaveLength(1);
    expect(result.current.planner.Wednesday).toHaveLength(1);
  });

  test("removes an exercise from a planner day", () => {
    const { result } = renderHook(() => useFitness(), { wrapper });

    const exercise = {
      id: "push-up",
      name: "Push-up",
    };

    act(() => {
      result.current.addToPlanner("Monday", exercise);
    });

    act(() => {
      result.current.removeFromPlanner("Monday", "push-up");
    });

    expect(result.current.planner.Monday).toEqual([]);
  });

  test("logs a workout", () => {
    jest.spyOn(Date, "now").mockReturnValue(123456789);

    const { result } = renderHook(() => useFitness(), { wrapper });

    const workout = {
      exercise: "Push-up",
      sets: 3,
      reps: 10,
      weight: 20,
      date: "2026-09-07T10:00:00.000Z",
    };

    act(() => {
      result.current.logWorkout(workout);
    });

    expect(result.current.history).toEqual([
      {
        ...workout,
        id: 123456789,
      },
    ]);
  });

  test("adds the newest workout to the beginning of history", () => {
    jest.spyOn(Date, "now").mockReturnValue(2);

    const { result } = renderHook(() => useFitness(), { wrapper });

    act(() => {
      result.current.logWorkout({
        exercise: "Squat",
        sets: 3,
        reps: 10,
        weight: 50,
        date: "2026-09-06",
      });
    });

    act(() => {
      result.current.logWorkout({
        exercise: "Push-up",
        sets: 3,
        reps: 12,
        weight: 0,
        date: "2026-09-07",
      });
    });

    expect(result.current.history[0].exercise).toBe("Push-up");
    expect(result.current.history[1].exercise).toBe("Squat");
  });

  test("saves updated data to localStorage", () => {
    const { result } = renderHook(() => useFitness(), { wrapper });

    const exercise = {
      id: "squat",
      name: "Squat",
    };

    act(() => {
      result.current.addToPlanner("Monday", exercise);
    });

    const saved = JSON.parse(localStorage.getItem("fitflow_fitness_data"));

    expect(saved.planner.Monday).toEqual([exercise]);
  });

  test("throws an error when useFitness is used outside the provider", () => {
    expect(() => {
      renderHook(() => useFitness());
    }).toThrow("useFitness must be used inside a <FitnessProvider>");
  });
});
