import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Flex, Text, Box, Icon } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";

import SearchFilters from "../components/SearchFilters";
import Property from "../components/Property";

import noResult from "../assets/noResult.png";

import { baseUrl, fetchApi } from "../utils/fetch-api";

const Search = ({ properties }) => {
  const [searchFilters, setSearchFilters] = useState(false);

  const router = useRouter();

  return (
    <Box>
      <Flex
        justifyContent="center"
        alignItems="center"
        fontSize="lg"
        fontWeight="bold"
        borderBottom="1px"
        borderColor="gray.200"
        bg="gray.100"
        p="2"
        cursor="pointer"
        onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
      >
        <Text>Search Property by Filters</Text>
        <Icon as={BsFilter} w="7" paddingLeft="2" />
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize="2xl" fontWeight="bold" p="4">
        Properties {router.query.purpose}
      </Text>

      {/* search - property item list */}
      <Flex flexWrap="wrap">
        {properties.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>

      {/* no result section */}
      {properties.length === 0 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          marginTop="5"
          marginBottom="5"
        >
          <Image
            src={noResult}
            alt="not result"
            width={450}
            height={350}
            objectFit="cover"
          />
          <Text fontSize="2xl" fontWeight="semibold" marginTop="10">
            No Results Found
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default Search;

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || "for-rent";
  const rentFrequency = query.rentFrequency || "yearly";
  const minPrice = query.minPrice || "0";
  const maxPrice = query.maxPrice || "1000000";
  const roomsMin = query.roomsMin || "0";
  const bathsMin = query.bathsMin || "0";
  const sort = query.sort || "price-desc";
  const areaMax = query.areaMax || "35000";
  const locationExternalIDs = query.locationExternalIDs || "5002";
  const categoryExternalID = query.categoryExternalID || "4";

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
}
