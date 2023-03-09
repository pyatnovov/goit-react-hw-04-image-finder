
import PropTypes from 'prop-types';
import { Btn } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <Btn onClick={onClick} className="Button">
      Load more
    </Btn>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};
