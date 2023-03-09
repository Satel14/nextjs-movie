import React, { Dispatch, SetStateAction } from 'react';

interface Props {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

const Search: React.FC<Props> = ({ searchValue, setSearchValue }) => {
  return (
    <div className="col col-sm-4">
      <input
        className="form-control"
        placeholder="Type to search..."
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
    </div>
  );
};

export default Search;
