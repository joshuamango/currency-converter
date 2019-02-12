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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "USD",
      to: "EUR",
      fromSymbol: "$",
      toSymbol: "€"
    };

    this.handleChoiceTo = this.handleChoiceTo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChoiceFrom = this.handleChoiceFrom.bind(this);
  }

  render() {
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

  handleSubmit(e) {
    e.preventDefault();
    const input = document.getElementById("input-1");
    const output = document.getElementById("input-2");

    if (input.value.slice(0, 1) !== this.state.fromSymbol) {
      input.value = this.state.fromSymbol + input.value;
    }

    let from = this.state.from;
    let to = this.state.to;
    let symbol = this.state.toSymbol;

    const url = "https://api.exchangeratesapi.io/latest?base=" + from;
    fetch(url)
      .then(resp => resp.json()) // Transform the data into json
      .then(function(data) {
        if (from === to) {
          output.value = input.value;
        } else {
          let keys = Object.keys(data.rates);
          let values = Object.values(data.rates);

          let number = keys.indexOf(to);
          let multiplier = values[number];
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

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
