import React from "react";
import ReactDOM from "react-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
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
        <h1>Currency Converter</h1>
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
      </Container>
    );
  }

  handleChoiceTo(key, evt) {
    const input = document.getElementById("input-1");
    const output = document.getElementById("input-2");
    let abbr = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"];
    let symbols = ["$", "€", "£", "¥", "$", "$"];
    this.setState({
      // Since array's are zero indexed...
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
      // Since array's are zero indexed...
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
            String(
              (input.value.slice(1, input.value.length) * multiplier).toFixed(2)
            );
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
