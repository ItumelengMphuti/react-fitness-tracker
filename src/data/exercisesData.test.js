import { EXERCISES, WEEKDAYS } from "./exercisesData";

describe("exercise data", () => {
  test("contains exercises with the required workout fields", () => {
    expect(EXERCISES.length).toBeGreaterThan(0);

    for (const exercise of EXERCISES) {
      expect(exercise).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          category: expect.any(String),
          muscleGroups: expect.any(Array),
          difficulty: expect.any(String),
          equipment: expect.any(String),
          duration: expect.any(Number),
          instructions: expect.any(Array),
        }),
      );
    }
  });

  test("exports the week in planner order", () => {
    expect(WEEKDAYS).toEqual([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ]);
  });
});
