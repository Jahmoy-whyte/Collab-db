export const Getuuid = async () => {
  const getid = await fetch("http://localhost:3000/getid");
  const jsondata = await getid.json();
  let id = jsondata.uuid;
  return id;
};
