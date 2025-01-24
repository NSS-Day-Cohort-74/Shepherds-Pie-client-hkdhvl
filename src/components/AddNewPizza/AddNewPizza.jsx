import { useEffect, useState } from "react";
import {
  createNewPizza,
  createToppingsForPizza,
  getCheeses,
  getSauces,
  getSizes,
  getToppings,
} from "../../services/pizzaService";
import "./AddNewPizza.css";
import { useLocation, useNavigate } from "react-router-dom";

export const AddNewPizza = () => {
  const [allSizes, setAllSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(1);
  const [selectedCheese, setSelectedCheese] = useState(1);
  const [allCheeses, setAllCheeses] = useState([]);
  const [selectedSauces, setSelectedSauces] = useState(1);
  const [allSauces, setAllSauces] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [allToppings, setAllToppings] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location.state?.orderId);

  const fetchAllPizzaInfo = async () => {
    try {
      const sizesArray = await getSizes();
      setAllSizes(sizesArray);
      const cheeseArray = await getCheeses();
      setAllCheeses(cheeseArray);
      const sauceArray = await getSauces();
      setAllSauces(sauceArray);
      const toppingArray = await getToppings();
      setAllToppings(toppingArray);
    } catch (error) {
      console.error("failed to load", error);
    }
  };


  const handleSizeChange = (event) => {
    setSelectedSize(parseInt(event.target.value));
  };
  const handleCheeseChange = (event) => {
    setSelectedCheese(parseInt(event.target.value));
  };
  const handleSauceChange = (event) => {
    setSelectedSauces(parseInt(event.target.value));
  };
  const handleToppingsChange = (toppingId) => {
    setSelectedToppings(prev => {
      if (prev.includes(toppingId)) {
        return prev.filter(id => id !== toppingId);
      } else {
        return [...prev, toppingId];
      }
    });
  };


const handleNewPizza = (pizza) => {
   
    const newOrder = {
        sizeId: selectedSize,
        cheeseId: selectedCheese,
        sauceId: selectedSauces,
        orderId: parseInt(location.state.orderId)
    };

    createNewPizza(newOrder).then((createdPizza) => {
        const toppingPromises = selectedToppings.map(toppingId => {
          return createToppingsForPizza({
            toppingId: toppingId,
            pizzaId: createdPizza.id
          });
        });
        return Promise.all(toppingPromises);
    }).then(() => {
        setSelectedSize(1);
        setSelectedCheese(1);
        setSelectedSauces(1);
        setSelectedToppings([])
        navigate(`/order/${location.state?.orderId}`);
    });
};


  
  useEffect(() => {
    fetchAllPizzaInfo();
  }, []);

  return (
    <>
      <h2>Pizza</h2>
      <p>Order #{location.state?.orderId}</p>
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
  <div className="toppings-grid">
    {allToppings.map((topping) => (
      <label key={topping.id} className="topping-checkbox">
        <input
          type="checkbox"
          checked={selectedToppings.includes(topping.id)}
          onChange={() => handleToppingsChange(topping.id)}
        />
        {topping.name}
      </label>
    ))}
  </div>
</div>

        <button
          className="pizza-button"
          onClick={() => {
            handleNewPizza();
          }}
        >
          Save Pizza
        </button>
      </div>
    </>
  );
};
