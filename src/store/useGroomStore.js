import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Zustand store for managing central application state
// Uses the persist middleware to automatically sync state to localStorage.
export const useGroomStore = create(
  persist(
    (set) => ({
      // --- Theme (Light / Dark) ---
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

      // --- Saved Hairstyles ---
      savedHairstyles: [],
      saveHairstyle: (style) => set((state) => {
        if (state.savedHairstyles.some((h) => h.id === style.id)) return state
        return { savedHairstyles: [...state.savedHairstyles, style] }
      }),
      removeHairstyle: (id) => set((state) => ({
        savedHairstyles: state.savedHairstyles.filter((h) => h.id !== id)
      })),

      // --- Active Skincare Routine ---
      activeRoutine: null, // { problemId, problemName, routineLabel, routine, quizResult, savedAt }
      saveRoutine: (problemId, routineLabel, routine, quizResult = null) => set({
        activeRoutine: {
          problemId,
          problemName: routineLabel,  // kept for dashboard backward compatibility
          routineLabel,
          routine,
          quizResult,
          savedAt: new Date().toISOString()
        }
      }),
      clearRoutine: () => set({ activeRoutine: null }),

      // --- Skincare quiz history ---
      // lastQuizCompletedAt: ISO timestamp of the most recent completed quiz.
      // Used to surface the "time to retake" nudge after ~60 days.
      lastQuizCompletedAt: null,
      setLastQuizCompletedAt: (ts = null) => set({ lastQuizCompletedAt: ts ?? new Date().toISOString() }),

      // --- One-time safety note dismissal ---
      // safetyNoteDismissedAt: ISO timestamp when the user dismissed the standing safety note.
      // null = not yet dismissed (show it). Non-null = dismissed (don't show again).
      safetyNoteDismissedAt: null,
      dismissSafetyNote: () => set({ safetyNoteDismissedAt: new Date().toISOString() }),

      // --- Retake nudge dismissal ---
      // retakeNudgeDismissedAt: ISO timestamp of when the user dismissed the retake nudge.
      // Reset to null whenever a new quiz is completed so the cycle restarts.
      retakeNudgeDismissedAt: null,
      dismissRetakeNudge: () => set({ retakeNudgeDismissedAt: new Date().toISOString() }),

      // --- History of Scan / Quiz ---
      lastFaceShape: null,
      faceShapeConfidence: null,  // 'good' | 'low'
      faceShapeScannedAt: null,   // ISO timestamp
      lastSkinProblemId: null,
      setLastFaceShape: (faceShape, confidence = 'good') => set({
        lastFaceShape: faceShape,
        faceShapeConfidence: confidence,
        faceShapeScannedAt: new Date().toISOString(),
      }),
      clearFaceShape: () => set({ lastFaceShape: null, faceShapeConfidence: null, faceShapeScannedAt: null }),
      setLastSkinProblemId: (problemId) => set({ lastSkinProblemId: problemId }),

      // --- Reset all state ---
      resetAll: () => set({
        savedHairstyles: [],
        activeRoutine: null,
        lastFaceShape: null,
        faceShapeConfidence: null,
        faceShapeScannedAt: null,
        lastSkinProblemId: null,
        lastQuizCompletedAt: null,
        safetyNoteDismissedAt: null,
        retakeNudgeDismissedAt: null,
      })
    }),
    {
      name: 'groomwise-store',
      partialize: (state) => {
        // eslint-disable-next-line no-unused-vars
        const { lastFaceShape, faceShapeConfidence, faceShapeScannedAt, ...rest } = state
        return rest
      },
      // Clean-break migration: if any saved hairstyle is from the old catalog
      // (missing compatibleFaceShapes, hairTypes, or thicknesses), clear the entire savedHairstyles array.
      onRehydrateStorage: () => (state) => {
        if (!state) return
        const saved = state.savedHairstyles
        if (Array.isArray(saved) && saved.length > 0) {
          const hasOldFormat = saved.some(h => !h.compatibleFaceShapes || !h.hairTypes || !h.thicknesses)
          if (hasOldFormat) {
            state.savedHairstyles = []
          }
        }
      },
    }
  )
)
