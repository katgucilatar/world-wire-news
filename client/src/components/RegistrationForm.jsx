import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

import { REGISTER_USER } from "../graphql/mutations";

import { useCurrentUserContext } from "../context/CurrentUser";

export default function Registration() {
  const { loginUser } = useCurrentUserContext();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [register, { error }] = useMutation(REGISTER_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await register({
        variables: {
          firstName: formState.firstName,
          lastName: formState.lastName,
          email: formState.email,
          password: formState.password,
        },
      });
      const { token, user } = mutationResponse.data.register;
      loginUser(user, token);
      navigate("/dashboard");
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  const handleChange = (event) => {
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
        <h2 className="text-2xl mb-10">Register</h2>
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
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-4"
        >
          Sign Up
        </button>
        <p className="mt-4">
          Already have an account? Login <Link to="/login">here</Link>
        </p>
      </form>
    </>
  );
}
