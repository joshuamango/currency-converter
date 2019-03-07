import React from "react";
import ReactDOM from "react-dom";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

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
      toSymbol: "€"
    };

    /* Bind each method in this component the constructors' "this"
       so that they are able to access the state of the component.*/
    this.handleChoiceTo = this.handleChoiceTo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChoiceFrom = this.handleChoiceFrom.bind(this);
  }

  render() {
    // This return statement contains everything that is displayed on the page.
    return (
      <Container className="App">
        <Navbar bg="dark" variant="dark" id="navbar">
          <Navbar.Brand id="title">Currency Converter</Navbar.Brand>
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
                  variant="outline-secondary"
                  title={this.state.from}
                  onSelect={this.handleChoiceTo}
                  id="left-dropdown"
                  as={InputGroup.Prepend}
                >
                  <Dropdown.Item eventKey="1">US Dollar (USD)</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Euro (EUR)</Dropdown.Item>
                  <Dropdown.Item eventKey="3">Pound (GBP)</Dropdown.Item>
                  <Dropdown.Item eventKey="4">Yen (JPY)</Dropdown.Item>
                  <Dropdown.Item eventKey="5">
                    Canadian Dollar (CAD)
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="6">
                    Australian Dollar (AUD)
                  </Dropdown.Item>
                </DropdownButton>
                <FormControl
                  id="input-1"
                  autoComplete="off"
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
                  variant="outline-secondary"
                  title={this.state.to}
                  onSelect={this.handleChoiceFrom}
                  id="right-dropdown"
                >
                  <Dropdown.Item eventKey="1">US Dollar (USD)</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Euro (EUR)</Dropdown.Item>
                  <Dropdown.Item eventKey="3">Pound (GBP)</Dropdown.Item>
                  <Dropdown.Item eventKey="4">Yen (JPY)</Dropdown.Item>
                  <Dropdown.Item eventKey="5">
                    Canadian Dollar (CAD)
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="6">
                    Australian Dollar (AUD)
                  </Dropdown.Item>
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
        {/* Add footer */}
      </Container>
    );
  }

  /* Invoked when left dropdown selection changes. 
     Changes state to include new currency abbreviation
     and it associated symbol. */
  handleChoiceTo(key, evt) {
    const input = document.getElementById("input-1");
    const output = document.getElementById("input-2");
    let abbr = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"];
    let symbols = ["$", "€", "£", "¥", "$", "$"];
    this.setState({
      from: abbr[key - 1],
      fromSymbol: symbols[key - 1]
    });
    input.value = output.value = "";
  }

  /* Invoked when right dropdown selection changes. 
     Changes state to include new currency abbreviation
     and it associated symbol. */
  handleChoiceFrom(key, evt) {
    const input = document.getElementById("input-1");
    const output = document.getElementById("input-2");
    let abbr = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"];
    let symbols = ["$", "€", "£", "¥", "$", "$"];
    this.setState({
      to: abbr[key - 1],
      toSymbol: symbols[key - 1]
    });
    input.value = output.value = "";
  }

  // Invoked whenever the text in the left text-field is changed.
  handleSubmit(e) {
    e.preventDefault();

    // Save a reference to each text-field
    const input = document.getElementById("input-1");
    const output = document.getElementById("input-2");

    // Ensures that the symbol in the left text-field is correct
    if (input.value.slice(0, 1) !== this.state.fromSymbol) {
      input.value = this.state.fromSymbol + input.value;
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
