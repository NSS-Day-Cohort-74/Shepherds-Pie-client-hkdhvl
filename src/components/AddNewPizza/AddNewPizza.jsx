import { useEffect, useState } from "react";
import { getCheeses, getSauces, getSizes, getToppings } from "../../services/pizzaService";
import "./AddNewPizza.css";
// import { getPizzaData } from "../../services/orderService"

export const AddNewPizza = () => {
  const [allSizes, setAllSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedCheese, setSelectedCheese] = useState("");
  const [allCheeses, setAllCheeses] = useState([]);
  const [selectedSauces, setSelectedSauces] = useState("")
  const [allSauces, setAllSauces] = useState([])
  const [selectedToppings, setSelectedToppings] = useState("")
  const [allToppings, setAllToppings] = useState([])

  const fetchAllPizzaInfo = async () => {
    try {
      const sizesArray = await getSizes();
      setAllSizes(sizesArray);
      const cheeseArray = await getCheeses();
      setAllCheeses(cheeseArray);
      const sauceArray = await getSauces()
      setAllSauces(sauceArray)
      const toppingArray = await getToppings()
      setAllToppings(toppingArray)
    } catch (error) {
      console.error("failed to load", error);
    }
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };
  const handleCheeseChange = (event) => {
    setSelectedCheese(event.target.value);
  };
  const handleSauceChange = (event) => {
    setSelectedSauces(event.target.value);
  };
  const handleToppingsChange = (event) => {
    setSelectedToppings(event.target.value);
  };
  
  useEffect(() => {
    fetchAllPizzaInfo();
  }, []);

  return (
    <>
      <h2>Pizza</h2>

      <div className="pizza-container">
        <h2>Size:</h2>
        <div className="size-selection">
          <select id="size" value={selectedSize} onChange={handleSizeChange}>
          {allSizes.map((size) => (
              <option key={size.id} value={size.id}>
                {size.name}
              </option>
            ))}
          </select>
        </div>

        <div className="cheese-selection">
            <h2>Cheese:</h2>
          <select
            id="cheese"
            value={selectedCheese}
            onChange={handleCheeseChange}
          >
            {allCheeses.map((cheese) => (
              <option key={cheese.id} value={cheese.id}>
                {cheese.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sauce-selection">
            <h2>Sauce</h2>
            <select
            id="sauce"
            value={selectedSauces}
            onChange={handleSauceChange}
          >
            {allSauces.map((sauce) => (
              <option key={sauce.id} value={sauce.id}>
                {sauce.name}
              </option>
            ))}
          </select>
        </div>

        <div className="toppings-selection">
            <h2>Toppings</h2>
            <select
            id="topping"
            value={selectedToppings}
            onChange={handleToppingsChange}
          >
            {allToppings.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>


      </div>
    </>
  );
};
