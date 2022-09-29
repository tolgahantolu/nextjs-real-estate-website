import Link from "next/link";
import Image from "next/image";
import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";

import DefaultImage from "../assets/placeholder.png";

//prettier-ignore
const Property = ({property: {title, coverPhoto, price, rentFrequency, rooms, area, agency, baths, isVerified, externalId}}) => {
	return (
		<Link href={`/property/${externalId}`} passHref>
			<Flex justifyContent="flex-start" alignItems="center" flexWrap="wrap" w={420} p="5" paddingTop="0" >
				<Box>
					<Image src={coverPhoto ? coverPhoto.url : DefaultImage} width={400} height={260} alt="placeholder house"></Image>
				</Box>
			<Box w="full">
				<Flex justifyContent="space-between" alignItems="center" paddingTop="2">
					<Flex alignItems="center">
						<Box paddingRight="3" color="green.400">
							{isVerified && <GoVerified />}
						</Box>
						<Text fontSize="lg" fontWeight="bold">AED {millify(price)}{rentFrequency && `/${rentFrequency}`}</Text>
					</Flex>
					<Box>
						<Avatar size="sm" src={agency?.logo?.url} />
					</Box>
				</Flex>
				<Flex justifyContent="space-between" alignItems="center" p="1" w="250px" color="blue.400">
					{rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
				</Flex>
				<Text fontSize="lg" >
					{title.length > 30 ? `${title.substring(0, 30)}... ` : title}
				</Text>
			</Box>
			</Flex>
		</Link>
	)
}

export default Property;
