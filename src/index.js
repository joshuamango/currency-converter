import React from "react";
import ReactDOM from "react-dom";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Line } from "react-chartjs-2";

import "./styles.css";

// The main (and only) component in the application
// I should probably split it up but yeah...
class App extends React.Component {
  constructor(props) {
    super(props);

    // Stores the symbols and abbreviations of the selected currencies
    this.state = {
      from: "USD",
      to: "EUR",
      fromSymbol: "$",
      toSymbol: "€",
      theme: "dark",
      data: {
        labels: [],
        datasets: [
          {
            label: "Exchange Rate Over Past 7 Days",
            data: [1, 2, 3, 4, 5],
            backgroundColor: ["rgba(130, 130, 130, 0.2)"],
            borderColor: ["rgba(90,90,90,1)"],
            borderWidth: 2
          }
        ]
      }
    };

    /* Bind each method in this component the constructors' "this"
       so that they are able to access the state of the component.*/
    this.handleChoiceTo = this.handleChoiceTo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChoiceFrom = this.handleChoiceFrom.bind(this);
    this.handleGraph = this.handleGraph.bind(this);
    this.handleTheme = this.handleTheme.bind(this);
  }

  render() {
    const data = this.state.data;
    const options = {
      layout: {
        margin: {
          left: 0,
          right: 0,
          top: 100,
          bottom: 0
        }
      },
      legend: {
        position: "bottom"
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: `${this.state.to} per 1 ${this.state.from}`
            }
          }
        ]
      }
    };

    // This return statement contains everything that is displayed on the page.
    return (
      <Container className="App">
        <Navbar bg={this.state.theme} variant="dark" id="navbar">
          <Navbar.Brand id="title">Currency Converter</Navbar.Brand>
          <a
            id="palette"
            href="#"
            onClick={this.handleTheme}
            style={{ marginRight: "10px", paddingTop: "10px" }}
            variant="outline-light"
          >
            <ion-icon id="palette" name="color-palette" />
          </a>
          <Button
            variant="outline-light"
            href="https://www.github.com/joshuamango/currency-converter/"
          >
            About
          </Button>
        </Navbar>
        <form onSubmit={this.handleSubmit}>
          <div id="form-box">
            {/* Left text input*/}
            <div id="input-group-1">
              <InputGroup>
                <DropdownButton
                  variant={this.state.theme}
                  title={this.state.from}
                  onSelect={this.handleChoiceTo}
                  id="left-dropdown"
                  as={InputGroup.Prepend}
                >
                  <Dropdown.Item eventKey="1">US Dollar (USD)</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Euro (EUR)</Dropdown.Item>
                  <Dropdown.Item eventKey="3">
                    British Pound (GBP)
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="4">Japanese Yen (JPY)</Dropdown.Item>
                  <Dropdown.Item eventKey="5">
                    Canadian Dollar (CAD)
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="6">
                    Australian Dollar (AUD)
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="7">Swiss Franc (CHF)</Dropdown.Item>
                  <Dropdown.Item eventKey="8">Chinese Yuan (CNY)</Dropdown.Item>
                </DropdownButton>
                <FormControl
                  id="input-1"
                  autoComplete="off"
                  inputMode="numeric"
                  onChange={this.handleSubmit}
                  placeholder={this.state.fromSymbol + "0.00"}
                />
              </InputGroup>
            </div>
            {/* Right text input*/}
            <div id="input-group-2">
              <InputGroup>
                <DropdownButton
                  as={InputGroup.Prepend}
                  variant={this.state.theme}
                  title={this.state.to}
                  onSelect={this.handleChoiceFrom}
                  id="right-dropdown"
                >
                  <Dropdown.Item eventKey="1">US Dollar (USD)</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Euro (EUR)</Dropdown.Item>
                  <Dropdown.Item eventKey="3">
                    British Pound (GBP)
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="4">Japanese Yen (JPY)</Dropdown.Item>
                  <Dropdown.Item eventKey="5">
                    Canadian Dollar (CAD)
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="6">
                    Australian Dollar (AUD)
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="7">Swiss Franc (CHF)</Dropdown.Item>
                  <Dropdown.Item eventKey="8">Chinese Yuan (CNY)</Dropdown.Item>
                </DropdownButton>
                <FormControl
                  id="input-2"
                  autoComplete="off"
                  placeholder={this.state.toSymbol + "0.00"}
                />
              </InputGroup>
            </div>
          </div>
        </form>
        <div style={{ marginTop: "20px" }}>
          <Line data={data} options={options} />
        </div>
        {/* Add footer */}
      </Container>
    );
  }

  componentDidMount() {
    this.handleGraph();
  }

  // Selects a random theme
  handleTheme(e) {
    let themeList = [
      "dark",
      "info",
      "primary",
      "secondary",
      "danger",
      "success",
      "warning"
    ];

    let themeRGB = [
      "rgba(52,58,64,0.3)", //dark
      "rgba(23,162,184,0.3)", //info
      "rgba(0,123,255,0.3)", //primary
      "rgba(134,142,150,0.3)", //secondary
      "rgba(220,53,69, 0.3)", //danger
      "rgba(40,167,69,0.3)", //success
      "rgba(255,193,7,0.3)" //warning
    ];

    let themeRGBDarker = [
      "rgba(52,58,64,0.6)", //dark
      "rgba(23,162,184,0.6)", //info
      "rgba(0,123,255,0.6)", //primary
      "rgba(134,142,150,0.6)", //secondary
      "rgba(220,53,69, 0.6)", //danger
      "rgba(40,167,69,0.6)", //success
      "rgba(255,193,7,0.6)"
    ];

    let index = this.getRandomInt(0, 7);

    let newThemeRGB = this.state.data;
    newThemeRGB.datasets[0].backgroundColor = themeRGB[index];
    newThemeRGB.datasets[0].borderColor = themeRGBDarker[index];

    let newTheme = themeList[index];
    this.setState({ theme: newTheme, data: newThemeRGB }, () => {
      console.log(this.state.data.backgroundColor);
    });
  }

  // Generates random number between two values
  // Credit: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  /* Invoked when left dropdown selection changes. 
     Changes state to include new currency abbreviation
     and it associated symbol. */
  handleChoiceTo(key, evt) {
    let abbr = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY"];
    let symbols = ["$", "€", "£", "¥", "$", "$", "₣", "元"];
    this.setState(
      {
        from: abbr[key - 1],
        fromSymbol: symbols[key - 1]
      },
      () => {
        this.handleSubmit();
        this.handleGraph();
      }
    );
  }

  /* Invoked when right dropdown selection changes. 
     Changes state to include new currency abbreviation
     and it associated symbol. */
  handleChoiceFrom(key, evt) {
    let abbr = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY"];
    let symbols = ["$", "€", "£", "¥", "$", "$", "₣", "元"];
    this.setState(
      {
        to: abbr[key - 1],
        toSymbol: symbols[key - 1]
      },
      () => {
        this.handleSubmit();
        this.handleGraph();
      }
    );
  }

  handleGraph() {
    if (this.state.to === this.state.from) {
      let currentState = { ...this.state.data };
      let number = currentState.datasets[0].label.length;
      let newArray = [];
      while (number > 0) {
        newArray.push(1);
        number = number - 1;
      }
      currentState.datasets[0].data = newArray;
      this.setState({ data: currentState });
    } else {
      const date = new Date();
      const weekAgo = new Date();
      weekAgo.setDate(date.getDate() - 7);
      const year = date.getFullYear();
      const day = date.getDate();
      const month = "0" + (date.getMonth() + 1);
      const url = `https://api.exchangeratesapi.io/history?start_at=${weekAgo.getFullYear()}-${"0" +
        (weekAgo.getMonth() +
          1)}-${weekAgo.getDate()}&end_at=${year}-${month}-${day}&symbols=${
        this.state.from
      },${this.state.to}&base=${this.state.from}`;

      let newValues = [];
      let newKeys = [];
      let to = this.state.to;

      fetch(url)
        .then(resp => resp.json())
        .then(data => {
          let keys = Object.keys(data.rates);
          let values = Object.values(data.rates);
          let map = new Map();
          for (let i = 0; i < keys.length; i++) {
            map.set(keys[i], values[i][to]);
          }

          map = new Map([...map.entries()].sort());
          let keyIterator = map.keys();
          let valueIterator = map.values();

          while (true) {
            let element = keyIterator.next();
            if (element.done === true) {
              break;
            } else {
              newKeys.push(element.value);
            }
          }

          while (true) {
            let element = valueIterator.next();
            if (element.done === true) {
              break;
            } else {
              newValues.push(element.value);
            }
          }

          let currentState = { ...this.state.data };
          currentState.labels = newKeys;
          currentState.datasets[0].data = newValues;
          this.setState({ data: currentState });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  // Invoked whenever the text in the left text-field is changed.
  handleSubmit(e = " ") {
    if (e !== " ") {
      e.preventDefault();
    }

    // Save a reference to each text-field
    const input = document.getElementById("input-1");
    const output = document.getElementById("input-2");

    // Ensures that the symbol in the left text-field is correct
    if (input.value.length === 1 && !isNaN(input.value)) {
      input.value = this.state.fromSymbol + input.value;
    }
    if (input.value.slice(0, 1) !== this.state.fromSymbol) {
      input.value =
        this.state.fromSymbol + input.value.slice(1, input.value.length);
    }

    // Save references to state elements for more concise code
    let from = this.state.from;
    let to = this.state.to;
    let symbol = this.state.toSymbol;

    // Exchange rates API published by the European Central Bank
    const url = "https://api.exchangeratesapi.io/latest?base=" + from;

    // "provides an easy, logical way to fetch resources asynchronously across the network."
    fetch(url)
      .then(resp => resp.json()) // Transforms the response into json
      .then(function(data) {
        if (from === to) {
          output.value = input.value;
        } else {
          /* This is the main logic of the application. We use the methods Object.keys
           and Object.values, which return arrays with each key and value from the rates 
           object in the JSON response. We then obtain from the "values" array the 
           value of the specific exchange rate the user is requesting. The input number 
           the user entered is then multiplied by the saved value and the result is placed
           in the output text-field, along with the proper symbol. */
          let keys = Object.keys(data.rates);
          let values = Object.values(data.rates);
          let multiplier = values[keys.indexOf(to)];
          output.value =
            symbol +
            Number(
              (input.value.slice(1, input.value.length) * multiplier).toFixed(2)
            ).toLocaleString();
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

// The app is rendered to the root div in our html file.
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);