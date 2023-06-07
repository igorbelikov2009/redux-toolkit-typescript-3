import React, { FC } from "react";
import Form from "react-bootstrap/Form";
import { IFilter, IOption } from "../models/types";
import MySelect from "./ui/select/MySelect";

interface ISortFilterProps {
  filter: IFilter;
  setFilter: React.Dispatch<
    React.SetStateAction<{
      sort: string;
      query: string;
    }>
  >;
  options: IOption[];
  placeholder: string;
}

const SortFilter: FC<ISortFilterProps> = ({ filter, setFilter, options, placeholder }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, query: e.target.value });
  };

  return (
    <div className="card">
      <h6>Это компонент SortFilter.tsx, объединяющий поиск и сортировку.</h6>

      <Form.Control
        className="mb-2"
        value={filter.query}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
      />

      <MySelect
        defaultValue="Сортировка"
        disabled={true}
        value={filter.sort}
        onChangeValue={(selectedSort) => setFilter({ ...filter, sort: selectedSort })}
        options={options}
      />
    </div>
  );
};

export default SortFilter;
