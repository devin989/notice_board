import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./NoticeForm.css";

const NewNotice = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      header: {
        value: "",
        isValid: false,
      },
      body: {
        value: "",
        isValid: false,
      },
      date: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let formData = {
        header: formState.inputs.header.value,
        body: formState.inputs.body.value,
        date: formState.inputs.date.value,
      };

      await sendRequest(
        "http://localhost:8080/api/notices/create",
        "POST",
        JSON.stringify(formData),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="header"
          element="input"
          type="text"
          label="Header"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Header."
          onInput={inputHandler}
        />
        <Input
          id="body"
          element="textarea"
          label="Body"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="date"
          element="input"
          label="Date"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid date."
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          ADD NOTICE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewNotice;
