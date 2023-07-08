export const Getuuid = async () => {
  const getid = await fetch("https://collabdb-server.onrender.com/getid");
  const jsondata = await getid.json();
  let id = jsondata.uuid;
  return id;
};
