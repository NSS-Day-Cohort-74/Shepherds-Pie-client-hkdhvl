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
// import { getPizzaData } from "../../services/orderService"

export const AddNewPizza = () => {
  const [allSizes, setAllSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(1);
  const [selectedCheese, setSelectedCheese] = useState(1);
  const [allCheeses, setAllCheeses] = useState([]);
  const [selectedSauces, setSelectedSauces] = useState(1);
  const [allSauces, setAllSauces] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState(1);
  const [allToppings, setAllToppings] = useState([]);
  const [pizzas, setPizzas] = useState([]);
//   const [currentOrder, setCurrentOrder] = useState(0)
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
  const handleToppingsChange = (event) => {
    setSelectedToppings(parseInt(event.target.value));
  };

//   const handleNewToppings = () => {
//     const newTopping = {
//       toppingId
//       pizzaId: pizzas.id
//     };

//     createToppingsForPizza(newTopping);
//   };

const handleNewPizza = (pizza) => {
   
    const newOrder = {
        sizeId: selectedSize,
        cheeseId: selectedCheese,
        sauceId: selectedSauces,
        orderId: parseInt(location.state.orderId)
    };

    createNewPizza(newOrder).then((createdPizza) => {
        const newTopping = {
            toppingId: selectedToppings,
            pizzaId: createdPizza.id
        };
        return createToppingsForPizza(newTopping);
    }).then(() => {
        setSelectedSize(1);
        setSelectedCheese(1);
        setSelectedSauces(1);
        setSelectedToppings(1);
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

        <button
          className="pizza-button"
          onClick={() => {
            // handleNewToppings();
            handleNewPizza();
          }}
        >
          Save Pizza
        </button>
      </div>
    </>
  );
};
