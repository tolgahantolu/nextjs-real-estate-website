import { Box, Flex, Text, Avatar, Spacer } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";
import DefaultImage from "../../assets/placeholder.png";
import { baseUrl, fetchApi } from "../../utils/fetch-api";
import ImageScrollBar from "../../components/ImageScrollBar";

const PropertyDetails = ({ propertyDetails }) => {
  const {
    price,
    rooms,
    baths,
    rentFrequency,
    title,
    area,
    agency,
    photos,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
  } = propertyDetails;

  return (
    <Box maxWidth="1000px" margin="auto" p="4">
      {photos && <ImageScrollBar data={photos} />}

      <Box w="full" p="6">
        <Flex justifyContent="space-between" alignItems="center" paddingTop="2">
          <Flex alignItems="center">
            <Box paddingRight="3" color="green.400">
              {isVerified && <GoVerified />}
            </Box>
            <Text fontSize="lg" fontWeight="bold">
              AED {millify(price)}
              {rentFrequency && `/${rentFrequency}`}
            </Text>
          </Flex>
          <Box>
            <Avatar size="sm" src={agency?.logo?.url} />
          </Box>
        </Flex>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          p="1"
          w="250px"
          color="blue.400"
        >
          {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{" "}
          <BsGridFill />
        </Flex>
        <Box marginTop="2">
          <Text fontSize="lg" marginBottom="2" fontWeight="bold">
            {title}
          </Text>
          <Text lineHeight="1.5" color="gray.600">
            {description}
          </Text>
        </Box>
        {/* prettier-ignore */}
        <Flex justifyContent="space-between" flexWrap="wrap" textTransform="uppercase">
			<Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3"> 
				<Text>Type</Text>
				<Text fontWeight="bold">{type}</Text>
			</Flex>
			<Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3"> 
				<Text>Purpose</Text>
				<Text fontWeight="bold">{purpose}</Text>
			</Flex>
			{furnishingStatus && (
				<Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3"> 
				<Text>Furnishing Status</Text>
				<Text fontWeight="bold">{furnishingStatus}</Text>
			</Flex>
			)}
		</Flex>
        <Box>
          {amenities.length && (
            <Text fontSize="2xl" fontWeight="bold" marginTop="5">
              Amenities
            </Text>
          )}
          <Flex flexWrap="wrap">
            {amenities.map((item) => {
              return item.amenities.map((amenity) => (
                <Text
                  fontWeight="bold"
                  color="blue.400"
                  fontSize="lg"
                  p="2"
                  m="1"
                  borderRadius="5"
                  bg="gray.200"
                  key={amenity.text}
                >
                  {" "}
                  {amenity.text}{" "}
                </Text>
              ));
            })}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyDetails;

export async function getServerSideProps({ params }) {
  const data = await fetchApi(
    `${baseUrl}/properties/detail?externalID=${params.id}`
  );

  return {
    props: {
      propertyDetails: data,
    },
  };
}
