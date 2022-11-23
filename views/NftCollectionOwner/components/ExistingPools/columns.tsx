import { Flex } from "@chakra-ui/react";
import { formatBalance } from "../../../../shared/utils/formatBalance";
import { formatTokenI } from "../../../../shared/utils/formatTokenIdentifier";
import { shortenHash } from "../../../../shared/utils/shortenHash";

export const columns = [
  {
    Header: "ID",
    accessor: "index",
    Cell: ({ row }) => {
      return (
        <Flex
          fontSize="14px"
          display={"flex"}
          width={"full"}
          alignItems={"center"}
          justifyContent="center"
        >
          {row.index + 1}
        </Flex>
      );
    },
  },
  {
    Header: "Collection",
    accessor: "collection",
    Cell: ({ row }) => {
      const pool = row.original;
      return (
        <Flex
          fontSize="14px"
          display={"flex"}
          width={"full"}
          alignItems={"center"}
          justifyContent="center"
        >
          {formatTokenI(pool.poolName)}
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
          width={"full"}
          alignItems={"center"}
          justifyContent="center"
        >
          {shortenHash(pool.creator)}
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
          width={"full"}
          alignItems={"center"}
          justifyContent="center"
        >
          {pool.nftsNow} / {pool.nfts}
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
          width={"full"}
          alignItems={"center"}
          justifyContent="center"
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
          width={"full"}
          alignItems={"center"}
          justifyContent="center"
        >
          {formatBalance({ balance: pool.rewards })}
        </Flex>
      );
    },
  },
  {
    Header: "Created",
    accessor: "timestam",
    Cell: ({ row }) => {
      const pool = row.original;
      const date = new Date(pool.timestam * 1000);
      return (
        <Flex
          fontSize="14px"
          display={"flex"}
          width={"full"}
          alignItems={"center"}
          justifyContent="center"
        >
          {date.toLocaleString("en-US")}
        </Flex>
      );
    },
  },
];
