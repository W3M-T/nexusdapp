import { Flex } from "@chakra-ui/react";
import { ActionButton } from "../../../components/tools/ActionButton";

export const columns = [
  {
    accessor: "index",

    Cell: ({ row }) => {
      const pool = row.original;
      return (
        <Flex
          fontSize="14px"
          display={"flex"}
          width={"max-content"}
          alignItems={"center"}
        >
          {pool.index}
        </Flex>
      );
    },
  },
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
  {
    Header: "Button",
    accessor: "name",
    disableSort: true,
    id: "buttons",
    Cell: ({ row }) => {
      const pool = row.original;
      return (
        <Flex
          fontSize="14px"
          display={"flex"}
          width={"max-content"}
          alignItems={"center"}
        >
          <ActionButton>Send Rewards</ActionButton>
        </Flex>
      );
    },
  },
];
