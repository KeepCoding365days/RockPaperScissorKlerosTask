export const saveContract = async (j1, j2, address) => {
  const response = await fetch("https://rpsbackend-eln7.onrender.com/api/addContract/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ j1: j1, j2: j2, address: address }),
  });
  return response;
};
export const getContracts = async (address) => {  //getting all games created by user
  const response = await fetch(
    `https://rpsbackend-eln7.onrender.com/api/myContracts/${address}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const resp = await response.json();
  console.log(resp);
  const data = resp.contracts;
  console.log(data);

  let addresses = [];
  if (data) {
    Object(data).map((key) => {
      addresses.push(key.address);
    });
  }
  console.log(addresses);

  return addresses;
};

export const getChallenges = async (address) => { //getting all game where current user is challenged by others
  const response = await fetch(
    `https://rpsbackend-eln7.onrender.com/myChallenges/${address}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const resp = await response.json();

  const data = resp.contracts;

  let addresses = [];
  if (data) {
    Object(data).map((key) => {
      addresses.push(key.address);
    });
  }

  return addresses;
};
export const deleteContract = async (address) => {
  const response = await fetch(`https://rpsbackend-eln7.onrender.com/deleteContract/${address}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });
  return response;
};
