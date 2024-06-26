import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import HomePage from './pages/HomePage';
import MainLayouts from "./layouts/MainLayouts"
import JobsPage from "./pages/JobsPage"
import NotFound from "./pages/NotFound"
import JobPage, { jobLoader } from "./pages/JobPage"
import AddJobPage from './pages/AddJobPage';


const App = () => {
  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJob)
    })
    return;
  }

  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE", 
    })
  }

  const router = createBrowserRouter(
    createRoutesFromElements(

      <Route path='/' element={<MainLayouts />}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage deleteJob={deleteJob} />} />
        <Route path='/jobs/:id' element={<JobPage />} loader={jobLoader} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />

        <Route path='*' element={<NotFound />} />

      </Route >

    )
  );

  return <RouterProvider router={router} />
}

export default App