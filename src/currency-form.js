import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const CurrencyForm = () => {
  return (
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
              <Dropdown.Item eventKey="5">Canadian Dollar (CAD)</Dropdown.Item>
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
              <Dropdown.Item eventKey="5">Canadian Dollar (CAD)</Dropdown.Item>
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
  );
};

export default CurrencyForm;
