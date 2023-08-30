import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';

import { REGISTER_USER } from '../utils/mutations';

import { useCurrentUserContext } from '../context/CurrentUser';

export default function Registration() {
  const { loginUser } = useCurrentUserContext();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userDefaultNews: 'World',
    selectedCountry: '',
  });

  const [register, { error }] = useMutation(REGISTER_USER);

  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      let variables = {
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        password: formState.password,
        userDefaultNews: formState.userDefaultNews,
      };

      if (formState.userDefaultNews === 'Select a country') {
        variables.selectedCountry = formState.selectedCountry;
      }

      const mutationResponse = await register({
        variables: variables,
      });

      console.log('Mutation response:', mutationResponse);
      const { token, user } = mutationResponse.data.register;
      loginUser(user, token);
      navigate('/dashboard');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <>
      {error ? (
        <div className="mb-4">
          <p className="error-text">The provided credentials are incorrect</p>
        </div>
      ) : null}
      <form
        id="registration-form"
        onSubmit={handleFormSubmit}
        className="bg-gray-100 p-6 rounded"
      >
        <h2 className="text-2xl text-center mb-5 font-bold mt-4">Register</h2>

        <label htmlFor="firstName" className="block mb-2">
          First name:
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formState.firstName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </label>
        <label htmlFor="lastName" className="block mb-2">
          Last name:
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formState.lastName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </label>
        <label htmlFor="email" className="block mb-2">
          Email:
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </label>
        <label htmlFor="password" className="block mb-2">
          Password:
          <input
            placeholder="******"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </label>

        <label htmlFor="userDefaultNews" className="block relative mb-2">
          Default News Category:
          <select
            name="userDefaultNews"
            value={formState.userDefaultNews}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded appearance-none"
          >
            <option value="World">World</option>
            <option value="Select a country">Select a country</option>
          </select>
        </label>
        {formState.userDefaultNews === 'Select a country' && (
          <div className="mt-1">
            <label htmlFor="selectedCountry" className="block mb-2">
              Selected Country:
              <input
                type="text"
                name="selectedCountry"
                value={formState.selectedCountry}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
              />
            </label>
          </div>
        )}

        <button
          type="submit"
          className="bg-newsBlue text-white p-2 rounded hover:bg-blue-600 mt-4 w-full mb-5"
        >
          Sign Up
        </button>
        <p className="mt-4">
          Already have an account? Login{' '}
          <Link to="/login" className="text-blue-600">
            here
          </Link>
        </p>
      </form>
    </>
  );
}
