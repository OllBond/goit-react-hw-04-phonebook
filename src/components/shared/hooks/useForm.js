import { useState } from 'react';
const useForm = ({ initialState, onSubmit }) => {
  const [state, setState] = useState({ ...initialState });

  // target - це деструктуризація event
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({ ...initialState });
  };
  return { state, setState, handleChange, handleSubmit };
};
export default useForm;
