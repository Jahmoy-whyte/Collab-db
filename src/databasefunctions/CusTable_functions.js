export const DB_Getcustomertabledata = async () => {
  const response = await fetch(
    "https://collabdb-server.onrender.com/customerdata"
  );
  return await checkresponce(response, "error getting customerdata");
};

export const DB_Getsearchinfo = async (column, searchtxt) => {
  const response = await fetch(
    `https://collabdb-server.onrender.com/customerdata/${column}/${searchtxt}`
  );
  return await checkresponce(response, "error getting searchdata");
};

export const DB_Insertdata = async (txt) => {
  const response = await fetch(
    "https://collabdb-server.onrender.com/customerdata",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(txt),
    }
  );

  return await checkresponce(response, "error inserting data");
};

export const DB_Updatedata = async (id, rowdata) => {
  const response = await fetch(
    `https://collabdb-server.onrender.com/customerdata/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rowdata),
    }
  );

  return await checkresponce(response, "error updating data");
};

export const DB_Deletedata = async (id) => {
  const response = await fetch(
    `https://collabdb-server.onrender.com/customerdata/${id}`,
    {
      method: "DELETE",
    }
  );

  return await checkresponce(response, "error deleting data");
};

export const DB_pagination = async (start) => {
  const responce = await fetch(
    `https://collabdb-server.onrender.com/customerdata/${start}`
  );

  return await checkresponce(responce, "error getting page");
};

const checkresponce = async (response, errormsg) => {
  if (!response.ok) throw new Error(errormsg);
  const jsondata = await response.json();
  if (jsondata.status === "nok") throw new Error(jsondata.res.code);
  return jsondata.res;
};
