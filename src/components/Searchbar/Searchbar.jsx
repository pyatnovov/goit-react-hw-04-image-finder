import { Component } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import PropTypes from 'prop-types';
import {
  Search,
  Form,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
export class Searchbar extends Component {
  state = {
    inputData: '',
  };
  inputChange = e => {
    this.setState({ inputData: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputData);
    this.setState({ inputData: '' });
  };
  render() {
    const { inputData } = this.state.inputData;
    return (
      <Search className="Searchbar">
        <Form className="SearchForm" onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit" className="SearchForm-button">
            <BiSearchAlt size={25} />
          </SearchFormButton>

          <SearchFormInput
            className="SearchForm-input"
            value={inputData}
            name="inputData"
            onChange={this.inputChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Search>
    );
  }
}

Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};
