import {
  AbiRegistry,
  Address,
  ContractFunction,
  ResultsParser,
  SmartContract,
  SmartContractAbi,
} from "@elrondnetwork/erdjs/out";
import axios from "axios";
import { getInterface, provider, WORKSPACES } from ".";

export const scQuery = async (
  workspace: WORKSPACES,
  funcName = "",
  args = [],
  endpointDef?: string
) => {
  try {
    const { address, abiUrl, implementsInterfaces } = getInterface(workspace);
    const response = await axios.get(abiUrl);
    const abiRegistry = await AbiRegistry.create(response.data);
    const abi = new SmartContractAbi(abiRegistry, [implementsInterfaces]);
    const contract = new SmartContract({
      address: address,
      abi: abi,
    });

    const query = contract.createQuery({
      func: new ContractFunction(funcName),
      args: args,
    });
    const queryResponse = await provider.queryContract(query);
    const endpointDefinition = contract.getEndpoint(endpointDef || funcName);
    const parser = new ResultsParser();
    const data = parser.parseQueryResponse(queryResponse, endpointDefinition);

    return data;
  } catch (error) {
    console.log("query error : ", error);
  }
};
export const scSimpleQuery = async (
  scAddress = "",
  funcName = "",
  args = []
) => {
  try {
    const contractAddress = new Address(scAddress);
    const contract = new SmartContract({ address: contractAddress });

    const query = contract.createQuery({
      func: new ContractFunction(funcName),
      args: args,
    });
    const resultsParser = new ResultsParser();

    const queryResponse = await provider.queryContract(query);
    const bundle = resultsParser.parseUntypedQueryResponse(queryResponse);

    return bundle;
  } catch (error) {
    console.log(error);
  }
};
