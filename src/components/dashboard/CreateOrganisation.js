import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";

const CreateOrganisation = () => {
  const [name, setName] = useState("");
  const [orgId, setOrgId] = useState("");
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState();

  function createOrganisation(e) {
    e.preventDefault();
    console.log({
      created: Date.now(),
      description: description,
      id: orgId,
      isActive: true,
      modified: Date.now(),
      name: name,
    });
    fetch("https://api.vidyartha.org/shastradaan/admin/org/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        created: Date.now(),
        description: description,
        id: orgId,
        isActive: true,
        modified: Date.now(),
        name: name,
      }),
    })
      .then((res) => res.text())
      .then((data) => setResponse({ errorOccured: false, data }))
      .catch((error) => setResponse({ errorOccured: true, error }));
  }
  console.log(response);
  return (
    <div className="create-organisation">
      <h2>Create Organisation</h2>
      <form onSubmit={createOrganisation}>
        <TextField
          onChange={(e) => setName(e.target.value)}
          label="Enter Organisation Name"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setOrgId(e.target.value)}
          label="Enter Organisation Id"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setDescription(e.target.value)}
          label="Enter Description"
          variant="outlined"
        />
        <button
          disabled={!name || !description || !orgId}
          className="create-org-btn"
          type="submit"
        >
          Create Organisation
        </button>
      </form>
      {response && response.errorOccured && (
        <p className="error-msg">
          Something went wrong! Try Again later : ${response.error.message}
        </p>
      )}
      {response && !response.errorOccured && (
        <p className="success-msg">Organisation Created!</p>
      )}
    </div>
  );
};

export default CreateOrganisation;
