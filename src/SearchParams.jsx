import { useState, useEffect,useContext} from "react";
import AdoptedPetContext from "./AdoptedPetContext";
// import Pet from "./Pet";
import Results from "./Results";
import useBreedList from "./useBreedList";
// let count=0;
const ANIMALS = ["bird", "repltile", "cat", "dog", "rabbit"];

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setanimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);
  const [adoptedPet,setAdoptedPet] =useContext(AdoptedPetContext);
//   count++

  useEffect(() => {
    requestPets();
  },[]);// eslint-disable-line react-hooks/exhaustive-deps

  
  async function requestPets(){
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  }
  
  return (
    <div className="search-params">
        {/* <h2>{count}</h2> */}
      <form
        onSubmit={(e)=>{
            e.preventDefault();
            requestPets();
        }}>

        {
          adoptedPet?(
            <div className="pet image-container">
              <img src={adoptedPet.images[0]} alt={adoptedPet.name}/>
            </div>
          ):null
        }

        <label htmlFor="location">
          Location
          <input
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            value={location}
            placeholder="Location"
          ></input>
        </label>

        <label htmlFor="animal">
          Animal
          <select
            onChange={(e) => {
              setanimal(e.target.value);
              setBreed("");
            }}
            id="animal"
            value={animal}
            placeholder="animal"
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            disabled={breeds.length === 0}
            value={breed}
            id="breed"
            onChange={(e) => setBreed(e.target.value)}
            placeholder="breed"
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>

        <button>Submit</button>
      </form>
      {/* {pets.map((pet) => (
        <Pet
          name={pet.name}
          animal={pet.animal}
          breed={pet.breed}
          key={pet.id}
        />
      ))} */}
      <Results pets={pets}/>
    </div>
  );
};

export default SearchParams;
