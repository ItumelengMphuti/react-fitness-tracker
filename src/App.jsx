import { Routes, Route } from "react-router-dom";
import { FitnessProvider } from "./context/FitnessContext";
import Home from "./pages/Home";
import ExercisesPage from "./components/Exercise/ExercisePage";
import WorkoutPlannerPage from "./components/WorkoutPlanner/WorkoutPlanner";
import HistoryPage from "./pages/HistoryPage";
import ProgressPage from "./pages/ProgressPage";
import NotFound from "./pages/NotFound";
import ExerciseDetail from "./components/Exercise/ExerciseDetail";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

function AppContent() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercises" element={<ExercisesPage />} />
          <Route path="/exercises/:exerciseId" element={<ExerciseDetail />} />
          <Route path="/planner" element={<WorkoutPlannerPage />} />
          <Route path="/planner/:day" element={<WorkoutPlannerPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/progress" element={<ProgressPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <FitnessProvider>
      <AppContent />
    </FitnessProvider>
  );
}

export default App;
