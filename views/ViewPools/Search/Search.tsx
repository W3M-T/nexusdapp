import SearchBar from "../../../shared/components/ui/SearchBar";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../shared/hooks/core/useRedux";
import {
  selectExistingPools,
  setFilteredPools,
} from "../../../shared/slices/pools";

const Search = () => {
  const dispatch = useAppDispatch();
  const { data: pools } = useAppSelector(selectExistingPools);
  const handleSearch = (e) => {
    const query = e.target.value;

    if (query === "") {
      dispatch(setFilteredPools(pools));
    } else {
      const newTokenList = pools.filter((pool) => {
        return (
          pool.poolName.toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1
        );
      });

      dispatch(setFilteredPools(newTokenList));
    }
  };
  return (
    <SearchBar
      wrapperProps={{ w: "full", maxWidth: "400px" }}
      onChange={handleSearch}
    />
  );
};

export default Search;