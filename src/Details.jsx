import { useState,useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import fetchPet from "./fetchPet";  
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
import AdoptedPetContext from "./AdoptedPetContext";

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate= useNavigate();
  // eslint-disable-next-line no-unused-vars
  const[_,setAdoptedPet]= useContext(AdoptedPetContext);
  const {id} = useParams();   
  const results= useQuery(["details",id],fetchPet);

  if(results.isError){
    return <h2>ohno</h2>
  }

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet=results.data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images}/>
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button onClick={()=>setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {
        showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button onClick={()=>{
                  setAdoptedPet(pet);
                  navigate("/")
                }}>Yes</button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null // you have to remove this semi-colon, my auto-formatter adds it back if I delete it
      }
      </div>
    </div>
  );
};

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary errorComponent={<h2>
      There was an error with this listing. <Link to="/">Click here</Link>{" "}
      to back to the home page.
    </h2>}>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;