import { Flex } from "@chakra-ui/react";

export const columns = [
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ row }) => {
      const pool = row.original;
      return (
        <Flex
          fontSize="14px"
          display={"flex"}
          width={"max-content"}
          alignItems={"center"}
        >
          {pool.name}
        </Flex>
      );
    },
  },
  {
    Header: "Creator",
    accessor: "creator",
    Cell: ({ row }) => {
      const pool = row.original;

      return (
        <Flex
          fontSize="14px"
          display={"flex"}
          width={"max-content"}
          alignItems={"center"}
        >
          {pool.creator}
        </Flex>
      );
    },
  },
  {
    Header: "NFTs",
    accessor: "nfts",
    Cell: ({ row }) => {
      const pool = row.original;
      return (
        <Flex
          fontSize="14px"
          display={"flex"}
          width={"max-content"}
          alignItems={"center"}
        >
          {pool.nfts}
        </Flex>
      );
    },
  },
  {
    Header: "Token",
    accessor: "token",
    Cell: ({ row }) => {
      const pool = row.original;
      return (
        <Flex
          fontSize="14px"
          display={"flex"}
          width={"max-content"}
          alignItems={"center"}
        >
          {pool.token}
        </Flex>
      );
    },
  },
  {
    Header: "Rewards",
    accessor: "rewards",
    Cell: ({ row }) => {
      const pool = row.original;
      return (
        <Flex
          fontSize="14px"
          display={"flex"}
          width={"max-content"}
          alignItems={"center"}
        >
          {pool.rewards}
        </Flex>
      );
    },
  },
];
