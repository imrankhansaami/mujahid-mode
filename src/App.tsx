import { useEffect } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Shell, ReadingShell } from './components/Shell'
import { Onboarding } from './pages/Onboarding'
import { Today } from './pages/Today'
import { Journey } from './pages/Journey'
import { LessonPage } from './pages/LessonPage'
import { Tools } from './pages/Tools'
import { Planner } from './pages/Planner'
import { QuranGuide } from './pages/QuranGuide'
import { Dopamine } from './pages/Dopamine'
import { LustMastery } from './pages/LustMastery'
import { Journal } from './pages/Journal'
import { Progress } from './pages/Progress'
import { SettingsPage } from './pages/SettingsPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route element={<Shell />}>
          <Route path="/today" element={<Today />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/planner" element={<Planner />} />
          <Route path="/tools/quran" element={<QuranGuide />} />
          <Route path="/tools/dopamine" element={<Dopamine />} />
          <Route path="/tools/lust" element={<LustMastery />} />
          <Route path="/tools/journal" element={<Journal />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route element={<ReadingShell />}>
          <Route path="/lesson/:id" element={<LessonPage />} />
        </Route>
        <Route path="/" element={<Navigate to="/today" replace />} />
        <Route path="*" element={<Navigate to="/today" replace />} />
      </Routes>
    </HashRouter>
  )
}