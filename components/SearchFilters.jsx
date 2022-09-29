import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import {
  Flex,
  Select,
  Box,
  Text,
  Input,
  Spinner,
  Icon,
  Button,
} from "@chakra-ui/react";
import { MdCancel } from "react-icons/md";

import { filterData, getFilterValues } from "../utils/filterData";

const SearchFilters = () => {
  const [filters, setFilters] = useState(filterData);

  const router = useRouter();

  //  !get filter values and change the url
  const searchProperties = (filterValues) => {
    const path = router.pathname;
    console.log(path);
    const query = router.query;
    console.log(query);

    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });

    router.push({ pathname: path, query: query });
  };

  return (
    //prettier-ignore
    <Flex justifyContent="center" alignItems="center" flexWrap="wrap" bg="gray.100" p="4 ">
      {filters.map((filter) => (
		<Box key={filter.queryName}>
			<Select onChange={(e) => searchProperties({[filter.queryName]: e.target.value})} placeholder={filter.placeholder} w="fit-content" p="2">
				{filter?.items?.map((item) => (
					<option value={item.value} key={item.value}>{item.name}</option>
				))}
			</Select>
		</Box>
	  ))}
    </Flex>
  );
};

export default SearchFilters;
