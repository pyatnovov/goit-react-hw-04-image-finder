import { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import PropTypes from 'prop-types';
import {
  Search,
  Form,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [data, setData] = useState('');

  const inputChange = e => {
    setData(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(data);
    setData('');
  };

  return (
    <Search>
      <Form onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <BiSearchAlt size={25} />
        </SearchFormButton>

        <SearchFormInput
          value={data}
          name="inputData"
          onChange={inputChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Search>
  );
};

Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};
