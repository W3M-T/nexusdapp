import SearchBar from "../../shared/components/ui/SearchBar";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/core/useRedux";
import { selectExistingPools, setFilteredPools } from "../../shared/redux/slices/pools";

const Search = ({ placeholder }: {
  placeholder?: string;
}) => {
  const dispatch = useAppDispatch();
  const { data3: pools } = useAppSelector(selectExistingPools);
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
      placeholder={placeholder ? placeholder : "Search"}
    />
  );
};

export default Search;
