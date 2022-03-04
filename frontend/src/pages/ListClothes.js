function ListClothes () {
    axios.defaults.baseURL = baseUrl;

  const { getAccessTokenSilently } = useAuth0();

  const [clothes, setClothes] = useState([]);
  const getClothings = async () => {
    try {
      const token = await getAccessTokenSilently();
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios
        .get("/api/clothings")
        .then((response) => {
          setClothes(response.data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };
    return(<>this is ListClothes</>);
}

export default ListClothes;