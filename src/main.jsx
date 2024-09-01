import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate ,
} from "react-router-dom";
import { MidSection } from "./Components/Mid_section/dashboard/dashboard.jsx";
import { ContactList } from "./Components/Mid_section/pages/contact_list/contact_list.jsx";
import { FavouriteContacts } from "./Components/Mid_section/pages/favourite_contacts/favourite_contacts.jsx";
import { BlockedContacts } from "./Components/Mid_section/pages/blocked_contacts/blocked_contacts.jsx";
import { Settings } from "./Components/Mid_section/pages/settings/settings.jsx";



const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />}>
      <Route index element={<Navigate to="/home" />} />
      <Route path="home" element={<MidSection />} />
      <Route path="contactlist" element={<ContactList />} />
      <Route path="favouritecontacts" element={<FavouriteContacts />} />
      <Route path="blockedcontacts" element={<BlockedContacts />} />
      <Route path="settings" element={<Settings />} />
    </Route>
  ])
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
