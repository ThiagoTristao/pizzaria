import {
  getPastaTypes,
  getPizzaSizes,
  getPizzas,
  getRecommendation,
  getCredits,
  putCreditsUser
} from '../../services/StepsService';
import React, {
  useState,
  useEffect
} from 'react';
import creditValue from '../../constants/creditValue';
import initialState from '../../constants/initialState';
import { FaPizzaSlice } from 'react-icons/fa';
import './styles.css';

function Steps() {
  const [error, setError] = useState(false);
  const [step, setStep] = useState(1);
  const [pastaTypes, setPastaTypes] = useState([]);
  const [selectPasta, setSelectPasta] = useState(initialState);
  const [pizzaSizes, setPizzasSizes] = useState([]);
  const [selectSize, setSelectSize] = useState(initialState);
  const [pizzas, setPizzas] = useState([]);
  const [selectPizza, setSelectPizza] = useState(initialState);
  const [pizzaRecommendation, setPizzaRecommendation] = useState(initialState);
  const [creditsUser, setCreditsUser] = useState(initialState);
  const [putCredits, setPutCredits] = useState(false);

  useEffect(() => {

    getPastaTypes()
      .then((resp) => {
        setPastaTypes(resp.data)
      })
      .catch((er) => {
        setError(true)
      });

    getPizzaSizes()
      .then((resp) => {
        setPizzasSizes(resp.data)
      })
      .catch((er) => {
        setError(true)
      });

    getPizzas()
      .then((resp) => {
        setPizzas(resp.data)
      })
      .catch((er) => {
        setError(true)
      });

    getRecommendation()
      .then((resp) => {
        setPizzaRecommendation(resp.data)
      })
      .catch((er) => {
        setError(true)
      });

    getCredits()
      .then((resp) => {
        setCreditsUser(resp.data)
      })
      .catch((er) => {
        setError(true)
      });
  }, []);

  function handleFinishOrder() {
    if (selectPizza === pizzaRecommendation.flavor) {
      putCreditsUser(creditsUser.creditsQuantity + creditValue)
        .then((resp) => {
          setPutCredits(true)
          setStep(step + 1)
        })
        .catch((er) => {
          setError(true)
        })
    }
    else {
      setStep(step + 1)
    }
  }

  return (
    <div className="container">
      <div className="title-container">
        <h1 className="title">Pizza Store </h1>
        <FaPizzaSlice size={32} />
      </div>
      {
        step !== 4 && (
          <p className="step">Passo {step}/3 </p>
        )
      }
      {
        !error && step === 1 &&
        <div className="form-container">
          <form className="form">
            <h4 className="form-category">Escolha a massa da sua pizza</h4>
            {
              pastaTypes.map((element, index) => {
                return (
                  <div key={index}>
                    <input
                      type="radio"
                      className="form-input"
                      value={element}
                      name={element}
                      checked={selectPasta === element ? true : false}
                      onChange={(e) => setSelectPasta(e.target.value)}
                    />
                    <span className="form-item">{element}</span>
                  </div>
                );
              })
            }

          </form>
          <div className="buttons-form">
            <button disabled className="button-back">
              Voltar
              </button>
            <button className="button-continue"
              onClick={() => setStep(step + 1)} disabled={selectPasta === initialState ? true : false}>
              Continuar
              </button>
          </div>
        </div>
      }
      {
        !error && step === 2 &&
        <div className="form-container">
          <form className="form">
            <h4 className="form-category">Escolha o tamanho da sua pizza</h4>
            {
              pizzaSizes.map((element, index) => {
                return (
                  <div key={index}>
                    <input
                      type="radio"
                      className="form-input"
                      value={element.pizzaSize}
                      name={element.pizzaSize}
                      checked={selectSize === element.pizzaSize ? true : false}
                      onChange={(e) => setSelectSize(e.target.value)}
                    />
                    <span className="form-item">{element.pizzaSize}</span>
                  </div>
                );
              })
            }
          </form>
          <div className="buttons-form">
            <button className="button-back"
              onClick={() => setStep(step - 1)}>
              Voltar
                    </button>
            <button className="button-continue"
              onClick={() => setStep(step + 1)} disabled={selectSize === initialState ? true : false}>
              Continuar
                    </button>
          </div>

        </div>
      }
      {
        !error && step === 3 &&
        <div className="form-container">
          <form className="form">
            <h4 className="form-category">Escolha o sabor da sua pizza</h4>
            {
              pizzaRecommendation !== initialState ?
                <div>
                  <h6>Nossa recomendação</h6>
                  <input
                    type="radio"
                    className="form-input"
                    value={pizzaRecommendation.flavor}
                    name={pizzaRecommendation.flavor}
                    checked={selectPizza === pizzaRecommendation.flavor ? true : false}
                    onChange={(e) => setSelectPizza(e.target.value)}
                  />
                  <span className="form-item">Sabor: {pizzaRecommendation.flavor} Preço: R${selectSize === 'Brotinho' ? pizzaRecommendation.priceBrotinho :
                    selectSize === 'Média' ? pizzaRecommendation.priceMedia :
                      pizzaRecommendation.priceFamilia}</span>
                </div>
                :
                null
            }
            <h6>Demais sabores</h6>
            {
              pizzas.map((element, index) => {
                return (
                  <div key={index}>
                    <input
                      type="radio"
                      className="form-input"
                      value={element.flavor}
                      name={element.flavor}
                      checked={selectPizza === element.flavor ? true : false}
                      onChange={(e) => setSelectPizza(e.target.value)}
                    />
                    <span className="form-item">Sabor: {element.flavor} Preço: R${selectSize === 'Brotinho' ? element.priceBrotinho :
                      selectSize === 'Média' ? element.priceMedia :
                        element.priceFamilia}</span>

                  </div>
                );
              })
            }
          </form>
          <div className="buttons-form">
            <button className="button-back"
              onClick={() => setStep(step - 1)}>
              Voltar
                  </button>
            <button className="button-continue"
              disabled={selectPizza === initialState ? true : false} onClick={() => handleFinishOrder()}
            >
              Continuar
                  </button>
          </div>
        </div>
      }

      {
        !error && step === 4 && putCredits &&
        <div className="final-step">
          <h2>Parabéns, seu pedido foi feito e acrescentamos 10 créditos.</h2>
          <button className="button-final"
            onClick={() => window.location.reload()}>Faça um novo pedido</button>
        </div>
      }

      {
        !error && step === 4 && !putCredits &&
        <div className="final-step">
          <h1>Parabéns, seu pedido foi feito.</h1>
          <button className="button-final"
            onClick={() => window.location.reload()}>Faça um novo pedido</button>
        </div>
      }

      {
        error &&
        <h1>houve um erro ao buscar dados.</h1>
      }

    </div>
  )
}

export default Steps;