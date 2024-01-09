// import React from "react"
import { createRoot } from "react-dom/client";
import { Link,BrowserRouter,Routes,Route } from "react-router-dom";
import SearchParams from "./SearchParams";
import Details from "./Details";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {useState} from 'react';
import AdoptedPetContext from "./AdoptedPetContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

// import { StrictMode } from "react";
// import Pet from "./Pet";

// const App = () => {
//   return React.createElement(
//     "div",
//     {},
//     React.createElement("h1", {}, "Adopt Me!"),
//     React.createElement(Pet, {
//       name: "Luna",
//       animal: "Dog",
//       breed: "Havanese",
//     }),
//     React.createElement(Pet, {
//       animal: "Bird",
//       name: "Pepper",
//       breed: "Cockatiel",
//     }),
//     React.createElement(Pet, { animal: "Cat", name: "Doink", breed: "Mixed" })
//   );
// };

// const App = () => {

//   return (
//     // <StrictMode>
//     <div>
//       {" "}
//       <h1>Adopt Me!</h1>{" "}
      
//       {/* { <Pet name="Luna" animal="Dog" breed="Havanese" />    
//       <Pet name="Pepper" animal="Bird" breed="Cocktail" />    
//       <Pet name="Doink" animal="Cat" breed="Mixed" /> }{" "} */}

//       {/* <SearchParams />{" "} */}
//     </div>
//     // </StrictMode>
//   );
// };

const App=()=>{
  const adoptedPet=useState(null);
  return(
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AdoptedPetContext.Provider value={adoptedPet}>
      <header>
      <Link to='/'>Adopt Me!</Link>
      </header>
        <Routes>
          <Route path="/details/:id" element={<Details/>}/>
          <Route path="/" element={<SearchParams/>}/>
        </Routes>
      </AdoptedPetContext.Provider>
    </QueryClientProvider>
    </BrowserRouter>
  )
}

const container = document.getElementById("root");
const root = createRoot(container);
// root.render(React.createElement(App));
root.render(<App />);
