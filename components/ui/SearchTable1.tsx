import {
  Button,
  Flex,
  Icon,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

function SearchTable1(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    gotoPage,
    pageCount,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setPageSize,
    setGlobalFilter,
    state,
  } = tableInstance;

  const createPages = (count) => {
    const arrPageCount = [];

    for (let i = 1; i <= count; i++) {
      arrPageCount.push(i);
    }

    return arrPageCount;
  };

  const { pageIndex, pageSize } = state;

  return (
    <>
      <Flex
        direction="column"
        w="100%"
        overflowX={{ sm: "auto", lg: "hidden" }}
      >
        <Flex
          justify="space-between"
          align="center"
          w="100%"
          px={{ xs: "0px", lg: "22px" }}
        >
          <Stack
            direction={{ sm: "column", md: "row" }}
            spacing={{ sm: "4px", md: "12px" }}
            align="center"
            me="12px"
            my="24px"
            minW={{ sm: "100px", md: "200px" }}
          >
            <Select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              color="gray.400"
              bg="#0F1535"
              border="0.5px solid"
              borderColor="#E2E8F04D"
              borderRadius="15px"
              size="sm"
              maxW="75px"
              cursor="pointer"
            >
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
              <option>25</option>
            </Select>
            <Text fontSize="xs" color="gray.400" fontWeight="500">
              entries per page
            </Text>
          </Stack>
          <Input
            mb={{ xs: "20px", lg: "0px" }}
            color="gray.400"
            bg="#0F1535"
            border="0.5px solid"
            borderColor="#E2E8F04D"
            borderRadius="15px"
            type="text"
            placeholder="Search..."
            minW="75px"
            maxW="175px"
            fontSize="sm"
            _focus={{ borderColor: "teal.300" }}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </Flex>
        <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => {
                  console.log("column", column);

                  return (
                    <Th
                      borderColor="#56577A"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      pe="0px"
                      key={index}
                    >
                      <Flex
                        justify="space-between"
                        align="center"
                        fontSize={{ sm: "10px", lg: "12px" }}
                        color="gray.400"
                      >
                        {column.render("Header")}
                        {!column.disableSort && (
                          <Icon
                            w={{ sm: "10px", md: "14px" }}
                            h={{ sm: "10px", md: "14px" }}
                            color={columns.isSorted ? "gray.500" : "gray.400"}
                            float="right"
                            as={
                              column.isSorted
                                ? column.isSortedDesc
                                  ? TiArrowSortedDown
                                  : TiArrowSortedUp
                                : TiArrowUnsorted
                            }
                          />
                        )}
                      </Flex>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    return (
                      <Td
                        borderColor="#56577A"
                        color="white"
                        {...cell.getCellProps()}
                        padding={{ xs: "20px 0px 12px 0px ", md: "12px" }}
                        paddingLeft={"8px"}
                        key={index}
                      >
                        {cell.render("Cell")}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <Flex
          direction={{ sm: "column", md: "row" }}
          justify="space-between"
          align="center"
          w="100%"
          px={{ md: "22px" }}
        >
          {!props.notShowEntriesText && (
            <Text
              fontSize="sm"
              color="white"
              fontWeight="500"
              mb={{ sm: "24px", md: "0px" }}
            >
              Showing {pageSize * pageIndex + 1} to{" "}
              {pageSize * (pageIndex + 1) <= tableData.length
                ? pageSize * (pageIndex + 1)
                : tableData.length}{" "}
              of {tableData.length} entries
            </Text>
          )}
          <Stack direction="row" alignSelf="flex-end" spacing="4px" ms="auto">
            <Button
              variant="no-hover"
              onClick={() => previousPage()}
              transition="all .5s ease"
              w="40px"
              h="40px"
              borderRadius="50%"
              bg="#fff"
              border="1px solid lightgray"
              display={
                pageSize === 5 ? "none" : canPreviousPage ? "flex" : "none"
              }
              _hover={{
                bg: "gray.200",
                opacity: "0.7",
                borderColor: "gray.500",
              }}
              aria-label="previous"
            >
              <Icon as={GrFormPrevious} w="16px" h="16px" color="gray.400" />
            </Button>
            {!props.notShowPagination && (
              <>
                {pageSize === 5 ? (
                  <NumberInput
                    max={pageCount - 1}
                    min={1}
                    w="75px"
                    mx="6px"
                    defaultValue="1"
                    onChange={(e) => gotoPage(e)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper
                        aria-label="next-page"
                        onClick={() => nextPage()}
                      />
                      <NumberDecrementStepper
                        aria-label="previous-page"
                        onClick={() => previousPage()}
                      />
                    </NumberInputStepper>
                  </NumberInput>
                ) : (
                  createPages(pageCount).map((pageNumber, index) => {
                    return (
                      <Button
                        variant="no-hover"
                        transition="all .5s ease"
                        onClick={() => gotoPage(pageNumber - 1)}
                        w="40px"
                        h="40px"
                        borderRadius="160px"
                        bg={pageNumber === pageIndex + 1 ? "brand.200" : "#fff"}
                        key={index}
                        aria-label={"page " + pageNumber}
                      >
                        <Text
                          fontSize="xs"
                          color={
                            pageNumber === pageIndex + 1 ? "#fff" : "gray.600"
                          }
                        >
                          {pageNumber}
                        </Text>
                      </Button>
                    );
                  })
                )}
              </>
            )}
            <Button
              variant="no-hover"
              onClick={() => nextPage()}
              transition="all .5s ease"
              w="40px"
              h="40px"
              borderRadius="160px"
              bg="#fff"
              display={pageSize === 5 ? "none" : canNextPage ? "flex" : "none"}
              aria-label="next"
            >
              <Icon as={GrFormNext} w="16px" h="16px" color="gray.400" />
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}

export default SearchTable1;
